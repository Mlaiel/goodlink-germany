"""
Goodlink Germany FastAPI Backend
Multi-marketplace AI-powered e-commerce platform
"""

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import structlog
import time

from app.core.config import settings
from app.core.database import engine
from app.api.v1.router import api_router
from app.core.exceptions import (
    ValidationException,
    AuthenticationException,
    MarketplaceException,
    AIAgentException
)

# Configure structured logging
structlog.configure(
    processors=[
        structlog.stdlib.filter_by_level,
        structlog.stdlib.add_logger_name,
        structlog.stdlib.add_log_level,
        structlog.stdlib.PositionalArgumentsFormatter(),
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.StackInfoRenderer(),
        structlog.dev.ConsoleRenderer()
    ],
    context_class=dict,
    logger_factory=structlog.stdlib.LoggerFactory(),
    cache_logger_on_first_use=True,
)

logger = structlog.get_logger()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    # Startup
    logger.info("Starting Goodlink Germany API", version=settings.VERSION)
    
    # Initialize database connections
    try:
        # Test database connection
        async with engine.begin() as conn:
            await conn.execute("SELECT 1")
        logger.info("Database connection established")
    except Exception as e:
        logger.error("Database connection failed", error=str(e))
        raise
    
    # Initialize Redis connection
    # Initialize AI services
    # Start background tasks
    
    yield
    
    # Shutdown
    logger.info("Shutting down Goodlink Germany API")


def create_application() -> FastAPI:
    """Create FastAPI application with all configurations"""
    
    app = FastAPI(
        title="Goodlink Germany API",
        description="Multi-marketplace AI-powered e-commerce platform",
        version=settings.VERSION,
        docs_url="/docs" if settings.DEBUG else None,
        redoc_url="/redoc" if settings.DEBUG else None,
        lifespan=lifespan
    )
    
    # CORS Configuration
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.ALLOWED_HOSTS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    # Gzip compression
    app.add_middleware(GZipMiddleware, minimum_size=1000)
    
    # Request logging middleware
    @app.middleware("http")
    async def log_requests(request: Request, call_next):
        start_time = time.time()
        
        # Log request
        logger.info(
            "Request started",
            method=request.method,
            url=str(request.url),
            client_ip=request.client.host if request.client else None
        )
        
        response = await call_next(request)
        
        # Log response
        process_time = time.time() - start_time
        logger.info(
            "Request completed",
            method=request.method,
            url=str(request.url),
            status_code=response.status_code,
            process_time=round(process_time, 4)
        )
        
        response.headers["X-Process-Time"] = str(process_time)
        return response
    
    # Exception handlers
    @app.exception_handler(ValidationException)
    async def validation_exception_handler(request: Request, exc: ValidationException):
        logger.warning("Validation error", error=str(exc), path=request.url.path)
        return JSONResponse(
            status_code=400,
            content={"error": "Validation Error", "detail": str(exc)}
        )
    
    @app.exception_handler(AuthenticationException)
    async def auth_exception_handler(request: Request, exc: AuthenticationException):
        logger.warning("Authentication error", error=str(exc), path=request.url.path)
        return JSONResponse(
            status_code=401,
            content={"error": "Authentication Error", "detail": str(exc)}
        )
    
    @app.exception_handler(MarketplaceException)
    async def marketplace_exception_handler(request: Request, exc: MarketplaceException):
        logger.error("Marketplace error", error=str(exc), path=request.url.path)
        return JSONResponse(
            status_code=502,
            content={"error": "Marketplace Error", "detail": str(exc)}
        )
    
    @app.exception_handler(AIAgentException)
    async def ai_agent_exception_handler(request: Request, exc: AIAgentException):
        logger.error("AI Agent error", error=str(exc), path=request.url.path)
        return JSONResponse(
            status_code=503,
            content={"error": "AI Agent Error", "detail": str(exc)}
        )
    
    # Health check endpoint
    @app.get("/health")
    async def health_check():
        return {
            "status": "healthy",
            "version": settings.VERSION,
            "timestamp": time.time()
        }
    
    # Include API router
    app.include_router(api_router, prefix="/api/v1")
    
    return app


# Create the application instance
app = create_application()