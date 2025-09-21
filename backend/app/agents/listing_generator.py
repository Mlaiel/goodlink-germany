"""Listing Generation AI Agent"""

import openai
from typing import Dict, List, Optional, Any
import json
import asyncio
from datetime import datetime

from app.agents.base import BaseAIAgent, AgentTask, AgentConfig, TaskStatus
from app.core.config import settings
from app.core.exceptions import AIAgentException, ContentGenerationException
from app.models.database import MarketplaceType


class ListingGeneratorAgent(BaseAIAgent):
    """AI Agent for generating marketplace-specific product listings"""
    
    def __init__(self, config: AgentConfig):
        super().__init__(config)
        self.openai_client = None
        
        # Marketplace-specific guidelines
        self.marketplace_guidelines = {
            MarketplaceType.AMAZON: {
                "title_max_length": 200,
                "bullet_points": 5,
                "bullet_max_length": 1000,
                "description_max_length": 2000,
                "keywords_max": 5,
                "required_fields": ["title", "description", "bullet_points", "keywords"],
                "style": "professional, benefit-focused, SEO-optimized"
            },
            MarketplaceType.EBAY: {
                "title_max_length": 80,
                "bullet_points": 10,
                "bullet_max_length": 500,
                "description_max_length": 5000,
                "keywords_max": 12,
                "required_fields": ["title", "description"],
                "style": "direct, searchable, feature-rich"
            },
            MarketplaceType.OTTO: {
                "title_max_length": 100,
                "bullet_points": 6,
                "bullet_max_length": 800,
                "description_max_length": 3000,
                "keywords_max": 8,
                "required_fields": ["title", "description", "bullet_points"],
                "style": "German-focused, technical accuracy, compliance-aware"
            }
        }
    
    async def initialize(self) -> bool:
        """Initialize the listing generator agent"""
        try:
            if not settings.OPENAI_API_KEY:
                raise AIAgentException("listing_generator", "OpenAI API key not configured")
            
            # Initialize OpenAI client
            self.openai_client = openai.AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
            
            # Test the connection
            await self.openai_client.models.list()
            
            self.logger.info("Listing generator agent initialized successfully")
            return True
            
        except Exception as e:
            self.logger.error("Failed to initialize listing generator", error=str(e))
            return False
    
    async def execute_task(self, task: AgentTask) -> AgentTask:
        """Execute listing generation task"""
        try:
            input_data = task.input_data
            
            # Extract parameters
            product_data = input_data.get("product")
            marketplace = MarketplaceType(input_data.get("marketplace", "amazon"))
            language = input_data.get("language", "en")
            target_audience = input_data.get("target_audience", "general")
            
            # Update progress
            task.progress_percentage = 10
            task.progress_message = "Analyzing product data"
            
            # Generate listing content
            listing_content = await self._generate_listing_content(
                product_data, marketplace, language, target_audience
            )
            
            task.progress_percentage = 70
            task.progress_message = "Validating generated content"
            
            # Validate against marketplace guidelines
            validation_results = await self._validate_listing_content(
                listing_content, marketplace
            )
            
            task.progress_percentage = 90
            task.progress_message = "Finalizing listing"
            
            # Calculate confidence score
            confidence_score = self._calculate_confidence_score(
                listing_content, validation_results
            )
            
            # Prepare result
            result = {
                "listing_content": listing_content,
                "validation": validation_results,
                "marketplace": marketplace.value,
                "language": language,
                "confidence_score": confidence_score,
                "auto_execute": self.should_auto_execute(confidence_score)
            }
            
            task.result = result
            task.confidence_score = confidence_score
            task.status = TaskStatus.COMPLETED
            task.completed_at = datetime.now()
            task.progress_percentage = 100
            task.progress_message = "Listing generation completed"
            
            self.logger.info(
                "Listing generated successfully",
                task_id=task.task_id,
                marketplace=marketplace.value,
                confidence=confidence_score
            )
            
            return task
            
        except Exception as e:
            task.status = TaskStatus.FAILED
            task.error_message = str(e)
            task.completed_at = datetime.now()
            
            self.logger.error(
                "Listing generation failed",
                task_id=task.task_id,
                error=str(e)
            )
            
            return task
    
    async def validate_input(self, input_data: Dict[str, Any]) -> List[str]:
        """Validate input data for listing generation"""
        errors = []
        
        # Check required fields
        if "product" not in input_data:
            errors.append("Product data is required")
        else:
            product = input_data["product"]
            
            if not product.get("title"):
                errors.append("Product title is required")
            if not product.get("description"):
                errors.append("Product description is required")
            if not product.get("category"):
                errors.append("Product category is required")
        
        # Validate marketplace
        marketplace = input_data.get("marketplace")
        if marketplace and marketplace not in [m.value for m in MarketplaceType]:
            errors.append(f"Unsupported marketplace: {marketplace}")
        
        # Validate language
        language = input_data.get("language", "en")
        if language not in settings.SUPPORTED_LANGUAGES:
            errors.append(f"Unsupported language: {language}")
        
        return errors
    
    async def _generate_listing_content(
        self, 
        product_data: Dict[str, Any], 
        marketplace: MarketplaceType,
        language: str,
        target_audience: str
    ) -> Dict[str, Any]:
        """Generate listing content using OpenAI"""
        
        guidelines = self.marketplace_guidelines.get(marketplace, {})
        
        # Create the prompt
        prompt = self._create_generation_prompt(
            product_data, marketplace, language, target_audience, guidelines
        )
        
        try:
            response = await self.openai_client.chat.completions.create(
                model=settings.OPENAI_MODEL,
                messages=[
                    {
                        "role": "system",
                        "content": "You are an expert e-commerce copywriter specializing in marketplace listings. Generate compelling, compliant, and SEO-optimized product listings."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=0.7,
                max_tokens=2000
            )
            
            # Parse the response
            content = response.choices[0].message.content
            listing_content = self._parse_generated_content(content, guidelines)
            
            return listing_content
            
        except Exception as e:
            raise ContentGenerationException(f"Failed to generate listing content: {str(e)}")
    
    def _create_generation_prompt(
        self,
        product_data: Dict[str, Any],
        marketplace: MarketplaceType,
        language: str,
        target_audience: str,
        guidelines: Dict[str, Any]
    ) -> str:
        """Create the generation prompt for OpenAI"""
        
        prompt = f"""
Generate a compelling product listing for {marketplace.value} marketplace in {language} language.

Product Information:
- Title: {product_data.get('title', '')}
- Category: {product_data.get('category', '')}
- Brand: {product_data.get('brand', '')}
- Description: {product_data.get('description', '')}
- Specifications: {json.dumps(product_data.get('specifications', {}), indent=2)}
- Key Features: {', '.join(product_data.get('attributes', {}).get('features', []))}
- Target Audience: {target_audience}

Marketplace Guidelines:
- Title max length: {guidelines.get('title_max_length', 200)} characters
- Bullet points: {guidelines.get('bullet_points', 5)} maximum
- Bullet point max length: {guidelines.get('bullet_max_length', 1000)} characters each
- Description max length: {guidelines.get('description_max_length', 2000)} characters
- Keywords max: {guidelines.get('keywords_max', 5)}
- Style: {guidelines.get('style', 'professional')}

Requirements:
1. Generate an optimized title that includes key search terms
2. Create compelling bullet points highlighting benefits and features
3. Write a detailed description that converts browsers to buyers
4. Extract relevant keywords for SEO
5. Ensure compliance with {marketplace.value} policies
6. Focus on benefits over features
7. Include emotional triggers and urgency where appropriate

Please provide the output in this JSON format:
{
    "title": "Optimized product title",
    "bullet_points": ["Bullet point 1", "Bullet point 2", ...],
    "description": "Detailed product description",
    "keywords": ["keyword1", "keyword2", ...],
    "compliance_notes": "Any compliance considerations"
}
"""
        
        # Add language-specific instructions
        if language == "de":
            prompt += "\n\nAdditional German Requirements:\n- Use formal language (Sie form)\n- Comply with German advertising regulations\n- Include technical specifications prominently\n- Focus on quality and reliability"
        elif language == "zh":
            prompt += "\n\nAdditional Chinese Requirements:\n- Use simplified Chinese characters\n- Emphasize value and quality\n- Include detailed specifications\n- Consider cultural preferences"
        
        return prompt
    
    def _parse_generated_content(self, content: str, guidelines: Dict[str, Any]) -> Dict[str, Any]:
        """Parse and clean the generated content"""
        try:
            # Try to extract JSON from the response
            import re
            json_match = re.search(r'\{.*\}', content, re.DOTALL)
            if json_match:
                parsed_content = json.loads(json_match.group())
            else:
                # Fallback parsing if JSON extraction fails
                parsed_content = self._fallback_parse(content)
            
            # Clean and validate content
            cleaned_content = self._clean_content(parsed_content, guidelines)
            
            return cleaned_content
            
        except Exception as e:
            self.logger.warning("Failed to parse generated content", error=str(e))
            # Return a basic structure with the raw content
            return {
                "title": "Generated Title",
                "bullet_points": ["Generated content available"],
                "description": content,
                "keywords": [],
                "compliance_notes": "Manual review required"
            }
    
    def _fallback_parse(self, content: str) -> Dict[str, Any]:
        """Fallback parsing when JSON extraction fails"""
        lines = content.split('\n')
        
        result = {
            "title": "",
            "bullet_points": [],
            "description": "",
            "keywords": [],
            "compliance_notes": ""
        }
        
        current_section = None
        
        for line in lines:
            line = line.strip()
            if not line:
                continue
                
            if "title:" in line.lower():
                result["title"] = line.split(':', 1)[1].strip()
            elif "bullet" in line.lower() or line.startswith("•") or line.startswith("-"):
                bullet = line.lstrip("•-").strip()
                if bullet:
                    result["bullet_points"].append(bullet)
            elif "description:" in line.lower():
                current_section = "description"
                desc = line.split(':', 1)[1].strip()
                if desc:
                    result["description"] = desc
            elif "keyword" in line.lower():
                keywords = line.split(':', 1)[1].strip()
                result["keywords"] = [k.strip() for k in keywords.split(',')]
            elif current_section == "description" and line:
                result["description"] += " " + line
        
        return result
    
    def _clean_content(self, content: Dict[str, Any], guidelines: Dict[str, Any]) -> Dict[str, Any]:
        """Clean and validate the generated content"""
        
        # Clean title
        title = content.get("title", "").strip()
        max_title_length = guidelines.get("title_max_length", 200)
        if len(title) > max_title_length:
            title = title[:max_title_length-3] + "..."
        content["title"] = title
        
        # Clean bullet points
        bullet_points = content.get("bullet_points", [])
        max_bullets = guidelines.get("bullet_points", 5)
        max_bullet_length = guidelines.get("bullet_max_length", 1000)
        
        cleaned_bullets = []
        for bullet in bullet_points[:max_bullets]:
            bullet = str(bullet).strip()
            if len(bullet) > max_bullet_length:
                bullet = bullet[:max_bullet_length-3] + "..."
            if bullet:
                cleaned_bullets.append(bullet)
        
        content["bullet_points"] = cleaned_bullets
        
        # Clean description
        description = content.get("description", "").strip()
        max_desc_length = guidelines.get("description_max_length", 2000)
        if len(description) > max_desc_length:
            description = description[:max_desc_length-3] + "..."
        content["description"] = description
        
        # Clean keywords
        keywords = content.get("keywords", [])
        max_keywords = guidelines.get("keywords_max", 5)
        cleaned_keywords = [str(k).strip().lower() for k in keywords[:max_keywords] if k]
        content["keywords"] = cleaned_keywords
        
        return content
    
    async def _validate_listing_content(
        self, 
        listing_content: Dict[str, Any], 
        marketplace: MarketplaceType
    ) -> Dict[str, Any]:
        """Validate the generated listing content"""
        
        guidelines = self.marketplace_guidelines.get(marketplace, {})
        validation_results = {
            "is_valid": True,
            "warnings": [],
            "errors": [],
            "compliance_score": 100
        }
        
        # Validate title
        title = listing_content.get("title", "")
        if not title:
            validation_results["errors"].append("Title is required")
            validation_results["is_valid"] = False
        elif len(title) > guidelines.get("title_max_length", 200):
            validation_results["warnings"].append(f"Title exceeds maximum length ({len(title)} chars)")
        
        # Validate bullet points
        bullet_points = listing_content.get("bullet_points", [])
        if len(bullet_points) < 3:
            validation_results["warnings"].append("Consider adding more bullet points")
        
        for i, bullet in enumerate(bullet_points):
            if len(bullet) > guidelines.get("bullet_max_length", 1000):
                validation_results["warnings"].append(f"Bullet point {i+1} is too long")
        
        # Validate description
        description = listing_content.get("description", "")
        if not description:
            validation_results["errors"].append("Description is required")
            validation_results["is_valid"] = False
        elif len(description) < 100:
            validation_results["warnings"].append("Description is quite short")
        
        # Validate keywords
        keywords = listing_content.get("keywords", [])
        if len(keywords) < 3:
            validation_results["warnings"].append("Consider adding more keywords")
        
        # Calculate compliance score
        total_checks = 10
        failed_checks = len(validation_results["errors"]) + len(validation_results["warnings"]) * 0.5
        compliance_score = max(0, (total_checks - failed_checks) / total_checks * 100)
        validation_results["compliance_score"] = compliance_score
        
        return validation_results
    
    def _calculate_confidence_score(
        self, 
        listing_content: Dict[str, Any], 
        validation_results: Dict[str, Any]
    ) -> float:
        """Calculate confidence score for the generated listing"""
        
        score = 0.0
        
        # Base score from compliance
        score += validation_results.get("compliance_score", 0) * 0.4
        
        # Content quality score
        title_quality = min(100, len(listing_content.get("title", "")) * 2)  # Up to 50 chars = 100%
        bullet_quality = min(100, len(listing_content.get("bullet_points", [])) * 20)  # 5 bullets = 100%
        desc_quality = min(100, len(listing_content.get("description", "")) / 5)  # 500 chars = 100%
        keyword_quality = min(100, len(listing_content.get("keywords", [])) * 25)  # 4 keywords = 100%
        
        content_score = (title_quality + bullet_quality + desc_quality + keyword_quality) / 4
        score += content_score * 0.6
        
        return min(100.0, score)


# Factory function to create listing generator agent
def create_listing_generator_agent(agent_id: str = "listing_generator") -> ListingGeneratorAgent:
    """Create a listing generator agent with default configuration"""
    
    config = AgentConfig(
        agent_id=agent_id,
        agent_type="listing_generator",
        name="Listing Generation Agent",
        description="AI agent for generating marketplace-specific product listings",
        enabled=True,
        automation_level=75,
        confidence_threshold=80,
        schedule_enabled=False,
        max_concurrent_tasks=10,
        task_timeout_seconds=300,
        retry_attempts=2,
        settings={
            "model": settings.OPENAI_MODEL,
            "temperature": 0.7,
            "max_tokens": 2000,
            "supported_marketplaces": ["amazon", "ebay", "otto", "kaufland"],
            "supported_languages": ["en", "de", "zh"]
        }
    )
    
    return ListingGeneratorAgent(config)