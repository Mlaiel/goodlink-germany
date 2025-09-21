"""Core configuration for Goodlink Germany API"""

import os
from typing import List, Optional
from pydantic_settings import BaseSettings
from pydantic import validator


class Settings(BaseSettings):
    """Application settings"""
    
    # Application
    VERSION: str = "1.0.0"
    DEBUG: bool = False
    ENVIRONMENT: str = "development"
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALLOWED_HOSTS: List[str] = ["*"]
    
    # Database
    DATABASE_URL: str = "postgresql+asyncpg://postgres:password@localhost/goodlink_germany"
    DATABASE_POOL_SIZE: int = 10
    DATABASE_MAX_OVERFLOW: int = 20
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # JWT
    JWT_SECRET_KEY: str = "jwt-secret-key-change-in-production"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # AI Services
    OPENAI_API_KEY: Optional[str] = None
    DEEPL_API_KEY: Optional[str] = None
    OPENAI_MODEL: str = "gpt-4"
    EMBEDDING_MODEL: str = "text-embedding-ada-002"
    
    # Marketplace APIs
    AMAZON_SP_API_CLIENT_ID: Optional[str] = None
    AMAZON_SP_API_CLIENT_SECRET: Optional[str] = None
    AMAZON_SP_API_REFRESH_TOKEN: Optional[str] = None
    AMAZON_MARKETPLACE_ID: str = "A1PA6795UKMFR9"  # Germany
    
    EBAY_APP_ID: Optional[str] = None
    EBAY_DEV_ID: Optional[str] = None
    EBAY_CERT_ID: Optional[str] = None
    EBAY_USER_TOKEN: Optional[str] = None
    
    OTTO_API_KEY: Optional[str] = None
    KAUFLAND_API_KEY: Optional[str] = None
    CDISCOUNT_API_KEY: Optional[str] = None
    
    # File Storage
    AWS_ACCESS_KEY_ID: Optional[str] = None
    AWS_SECRET_ACCESS_KEY: Optional[str] = None
    AWS_BUCKET_NAME: str = "goodlink-germany-assets"
    AWS_REGION: str = "eu-central-1"
    
    # Monitoring
    SENTRY_DSN: Optional[str] = None
    PROMETHEUS_PORT: int = 8001
    
    # Celery
    CELERY_BROKER_URL: str = "redis://localhost:6379/1"
    CELERY_RESULT_BACKEND: str = "redis://localhost:6379/2"
    
    # Languages
    SUPPORTED_LANGUAGES: List[str] = ["en", "de", "zh"]
    DEFAULT_LANGUAGE: str = "en"
    
    # Rate Limiting
    RATE_LIMIT_PER_MINUTE: int = 100
    RATE_LIMIT_PER_HOUR: int = 1000
    
    # Email
    SMTP_HOST: Optional[str] = None
    SMTP_PORT: int = 587
    SMTP_USER: Optional[str] = None
    SMTP_PASSWORD: Optional[str] = None
    SMTP_TLS: bool = True
    
    # WhatsApp Business API
    WHATSAPP_API_URL: str = "https://graph.facebook.com/v18.0"
    WHATSAPP_ACCESS_TOKEN: Optional[str] = None
    WHATSAPP_PHONE_NUMBER_ID: Optional[str] = None
    WHATSAPP_WEBHOOK_VERIFY_TOKEN: Optional[str] = None
    
    @validator("ALLOWED_HOSTS", pre=True)
    def parse_cors_origins(cls, v):
        if isinstance(v, str):
            return [i.strip() for i in v.split(",")]
        return v
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()