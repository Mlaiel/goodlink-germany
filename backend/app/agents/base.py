"""Base AI Agent framework for Goodlink Germany"""

from abc import ABC, abstractmethod
from typing import Dict, List, Optional, Any, AsyncGenerator
from datetime import datetime
from pydantic import BaseModel, Field
from enum import Enum
import asyncio
import structlog

logger = structlog.get_logger()


class AgentType(str, Enum):
    """Types of AI agents"""
    LISTING_GENERATOR = "listing_generator"
    PRICING_AGENT = "pricing_agent"
    INVENTORY_FORECASTER = "inventory_forecaster"
    REVIEW_MINER = "review_miner"
    CONTENT_CREATOR = "content_creator"
    SALES_CHAT = "sales_chat"
    IMAGE_OPTIMIZER = "image_optimizer"
    TRANSLATOR = "translator"
    AD_OPTIMIZER = "ad_optimizer"
    PROSPECTING_AGENT = "prospecting_agent"


class AgentStatus(str, Enum):
    """Agent status states"""
    IDLE = "idle"
    RUNNING = "running"
    PAUSED = "paused"
    ERROR = "error"
    TRAINING = "training"
    OFFLINE = "offline"


class AgentPriority(str, Enum):
    """Agent priority levels"""
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


class TaskStatus(str, Enum):
    """Task execution status"""
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"


class AgentConfig(BaseModel):
    """Configuration for an AI agent"""
    agent_id: str
    agent_type: AgentType
    name: str
    description: str
    enabled: bool = True
    priority: AgentPriority = AgentPriority.MEDIUM
    
    # Automation settings
    automation_level: int = Field(ge=0, le=100, description="Automation level 0-100%")
    confidence_threshold: int = Field(ge=0, le=100, description="Minimum confidence to auto-execute")
    
    # Scheduling
    schedule_enabled: bool = False
    cron_expression: Optional[str] = None
    schedule_timezone: str = "Europe/Berlin"
    
    # Resource limits
    max_concurrent_tasks: int = 5
    task_timeout_seconds: int = 300
    retry_attempts: int = 3
    
    # Notifications
    notifications: Dict[str, Any] = Field(default_factory=dict)
    
    # Agent-specific settings
    settings: Dict[str, Any] = Field(default_factory=dict)


class AgentTask(BaseModel):
    """A task for an AI agent to execute"""
    task_id: str
    agent_id: str
    task_type: str
    priority: AgentPriority = AgentPriority.MEDIUM
    input_data: Dict[str, Any]
    status: TaskStatus = TaskStatus.PENDING
    
    # Execution metadata
    created_at: datetime = Field(default_factory=datetime.now)
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    
    # Results
    result: Optional[Dict[str, Any]] = None
    error_message: Optional[str] = None
    confidence_score: Optional[float] = None
    
    # Progress tracking
    progress_percentage: int = 0
    progress_message: Optional[str] = None


class AgentMetrics(BaseModel):
    """Performance metrics for an agent"""
    total_tasks: int = 0
    successful_tasks: int = 0
    failed_tasks: int = 0
    average_execution_time: float = 0.0
    average_confidence: float = 0.0
    last_active: Optional[datetime] = None
    uptime_percentage: float = 100.0


class BaseAIAgent(ABC):
    """Base class for all AI agents"""
    
    def __init__(self, config: AgentConfig):
        self.config = config
        self.status = AgentStatus.IDLE
        self.current_tasks: Dict[str, AgentTask] = {}
        self.metrics = AgentMetrics()
        self.logger = logger.bind(agent_id=config.agent_id, agent_type=config.agent_type)
    
    @abstractmethod
    async def initialize(self) -> bool:
        """Initialize the agent (load models, connect to services, etc.)"""
        pass
    
    @abstractmethod
    async def execute_task(self, task: AgentTask) -> AgentTask:
        """Execute a specific task"""
        pass
    
    @abstractmethod
    async def validate_input(self, input_data: Dict[str, Any]) -> List[str]:
        """Validate input data for the agent"""
        pass
    
    async def start(self) -> bool:
        """Start the agent"""
        try:
            self.logger.info("Starting agent")
            
            if not await self.initialize():
                self.status = AgentStatus.ERROR
                return False
            
            self.status = AgentStatus.IDLE
            self.logger.info("Agent started successfully")
            return True
            
        except Exception as e:
            self.logger.error("Failed to start agent", error=str(e))
            self.status = AgentStatus.ERROR
            return False
    
    async def stop(self) -> bool:
        """Stop the agent and cancel running tasks"""
        try:
            self.logger.info("Stopping agent")
            
            # Cancel all running tasks
            for task_id, task in self.current_tasks.items():
                if task.status == TaskStatus.RUNNING:
                    task.status = TaskStatus.CANCELLED
                    self.logger.info("Cancelled running task", task_id=task_id)
            
            self.status = AgentStatus.OFFLINE
            self.logger.info("Agent stopped")
            return True
            
        except Exception as e:
            self.logger.error("Error stopping agent", error=str(e))
            return False
    
    async def pause(self) -> bool:
        """Pause the agent"""
        if self.status == AgentStatus.RUNNING:
            self.status = AgentStatus.PAUSED
            self.logger.info("Agent paused")
            return True
        return False
    
    async def resume(self) -> bool:
        """Resume the agent"""
        if self.status == AgentStatus.PAUSED:
            self.status = AgentStatus.IDLE
            self.logger.info("Agent resumed")
            return True
        return False
    
    async def submit_task(self, task: AgentTask) -> str:
        """Submit a task for execution"""
        if not self.config.enabled or self.status == AgentStatus.OFFLINE:
            raise ValueError("Agent is not available")
        
        # Validate input
        validation_errors = await self.validate_input(task.input_data)
        if validation_errors:
            task.status = TaskStatus.FAILED
            task.error_message = f"Validation errors: {', '.join(validation_errors)}"
            return task.task_id
        
        # Check concurrent task limit
        running_tasks = len([t for t in self.current_tasks.values() if t.status == TaskStatus.RUNNING])
        if running_tasks >= self.config.max_concurrent_tasks:
            task.status = TaskStatus.FAILED
            task.error_message = "Maximum concurrent tasks reached"
            return task.task_id
        
        # Add to current tasks
        self.current_tasks[task.task_id] = task
        
        # Execute task asynchronously
        asyncio.create_task(self._execute_task_wrapper(task))
        
        return task.task_id
    
    async def get_task_status(self, task_id: str) -> Optional[AgentTask]:
        """Get the status of a specific task"""
        return self.current_tasks.get(task_id)
    
    async def cancel_task(self, task_id: str) -> bool:
        """Cancel a running task"""
        task = self.current_tasks.get(task_id)
        if task and task.status in [TaskStatus.PENDING, TaskStatus.RUNNING]:
            task.status = TaskStatus.CANCELLED
            self.logger.info("Task cancelled", task_id=task_id)
            return True
        return False
    
    async def get_metrics(self) -> AgentMetrics:
        """Get agent performance metrics"""
        return self.metrics
    
    async def update_config(self, new_config: AgentConfig) -> bool:
        """Update agent configuration"""
        try:
            self.config = new_config
            self.logger.info("Agent configuration updated")
            return True
        except Exception as e:
            self.logger.error("Failed to update configuration", error=str(e))
            return False
    
    def should_auto_execute(self, confidence_score: float) -> bool:
        """Determine if task should be auto-executed based on confidence"""
        return (
            self.config.automation_level > 50 and 
            confidence_score >= (self.config.confidence_threshold / 100.0)
        )
    
    # Private methods
    async def _execute_task_wrapper(self, task: AgentTask):
        """Wrapper for task execution with error handling and metrics"""
        try:
            # Update task status
            task.status = TaskStatus.RUNNING
            task.started_at = datetime.now()
            self.status = AgentStatus.RUNNING
            
            self.logger.info("Executing task", task_id=task.task_id, task_type=task.task_type)
            
            # Execute with timeout
            try:
                completed_task = await asyncio.wait_for(
                    self.execute_task(task),
                    timeout=self.config.task_timeout_seconds
                )
                
                # Update metrics
                self._update_metrics(completed_task, success=True)
                
            except asyncio.TimeoutError:
                task.status = TaskStatus.FAILED
                task.error_message = "Task execution timed out"
                self._update_metrics(task, success=False)
                
        except Exception as e:
            task.status = TaskStatus.FAILED
            task.error_message = str(e)
            task.completed_at = datetime.now()
            self._update_metrics(task, success=False)
            
            self.logger.error(
                "Task execution failed", 
                task_id=task.task_id, 
                error=str(e)
            )
        
        finally:
            # Clean up completed/failed tasks after some time
            if task.status in [TaskStatus.COMPLETED, TaskStatus.FAILED, TaskStatus.CANCELLED]:
                # Remove from current tasks after 1 hour
                asyncio.create_task(self._cleanup_task(task.task_id, delay=3600))
            
            # Update agent status
            running_tasks = len([t for t in self.current_tasks.values() if t.status == TaskStatus.RUNNING])
            if running_tasks == 0:
                self.status = AgentStatus.IDLE
    
    def _update_metrics(self, task: AgentTask, success: bool):
        """Update agent performance metrics"""
        self.metrics.total_tasks += 1
        
        if success:
            self.metrics.successful_tasks += 1
        else:
            self.metrics.failed_tasks += 1
        
        if task.started_at and task.completed_at:
            execution_time = (task.completed_at - task.started_at).total_seconds()
            # Calculate running average
            total_successful = self.metrics.successful_tasks
            if total_successful > 0:
                self.metrics.average_execution_time = (
                    (self.metrics.average_execution_time * (total_successful - 1) + execution_time) 
                    / total_successful
                )
        
        if task.confidence_score:
            # Calculate running average confidence
            total = self.metrics.total_tasks
            self.metrics.average_confidence = (
                (self.metrics.average_confidence * (total - 1) + task.confidence_score) 
                / total
            )
        
        self.metrics.last_active = datetime.now()
    
    async def _cleanup_task(self, task_id: str, delay: int = 3600):
        """Clean up completed task after delay"""
        await asyncio.sleep(delay)
        self.current_tasks.pop(task_id, None)


class AgentManager:
    """Manager for all AI agents"""
    
    def __init__(self):
        self.agents: Dict[str, BaseAIAgent] = {}
        self.logger = logger.bind(component="agent_manager")
    
    async def register_agent(self, agent: BaseAIAgent) -> bool:
        """Register a new agent"""
        try:
            agent_id = agent.config.agent_id
            
            if agent_id in self.agents:
                self.logger.warning("Agent already registered, replacing", agent_id=agent_id)
            
            self.agents[agent_id] = agent
            
            # Start agent if enabled
            if agent.config.enabled:
                await agent.start()
            
            self.logger.info("Agent registered", agent_id=agent_id, agent_type=agent.config.agent_type)
            return True
            
        except Exception as e:
            self.logger.error("Failed to register agent", error=str(e))
            return False
    
    async def unregister_agent(self, agent_id: str) -> bool:
        """Unregister an agent"""
        try:
            agent = self.agents.get(agent_id)
            if not agent:
                return False
            
            await agent.stop()
            del self.agents[agent_id]
            
            self.logger.info("Agent unregistered", agent_id=agent_id)
            return True
            
        except Exception as e:
            self.logger.error("Failed to unregister agent", agent_id=agent_id, error=str(e))
            return False
    
    async def get_agent(self, agent_id: str) -> Optional[BaseAIAgent]:
        """Get an agent by ID"""
        return self.agents.get(agent_id)
    
    async def list_agents(self, agent_type: Optional[AgentType] = None) -> List[BaseAIAgent]:
        """List all agents, optionally filtered by type"""
        agents = list(self.agents.values())
        
        if agent_type:
            agents = [a for a in agents if a.config.agent_type == agent_type]
        
        return agents
    
    async def submit_task(self, agent_id: str, task: AgentTask) -> Optional[str]:
        """Submit a task to a specific agent"""
        agent = self.agents.get(agent_id)
        if not agent:
            return None
        
        return await agent.submit_task(task)
    
    async def get_system_metrics(self) -> Dict[str, Any]:
        """Get system-wide agent metrics"""
        total_agents = len(self.agents)
        active_agents = len([a for a in self.agents.values() if a.status == AgentStatus.RUNNING])
        
        total_tasks = sum(a.metrics.total_tasks for a in self.agents.values())
        successful_tasks = sum(a.metrics.successful_tasks for a in self.agents.values())
        
        return {
            "total_agents": total_agents,
            "active_agents": active_agents,
            "total_tasks": total_tasks,
            "successful_tasks": successful_tasks,
            "success_rate": (successful_tasks / total_tasks * 100) if total_tasks > 0 else 0,
            "agents": {
                agent_id: {
                    "type": agent.config.agent_type,
                    "status": agent.status,
                    "metrics": agent.metrics.dict()
                }
                for agent_id, agent in self.agents.items()
            }
        }


# Global agent manager instance
agent_manager = AgentManager()