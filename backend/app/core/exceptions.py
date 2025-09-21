"""Custom exceptions for Goodlink Germany API"""


class GoodlinkException(Exception):
    """Base exception for all Goodlink Germany errors"""
    pass


class ValidationException(GoodlinkException):
    """Raised when data validation fails"""
    pass


class AuthenticationException(GoodlinkException):
    """Raised when authentication fails"""
    pass


class AuthorizationException(GoodlinkException):
    """Raised when authorization fails"""
    pass


class MarketplaceException(GoodlinkException):
    """Raised when marketplace API calls fail"""
    
    def __init__(self, marketplace: str, message: str):
        self.marketplace = marketplace
        super().__init__(f"{marketplace}: {message}")


class AIAgentException(GoodlinkException):
    """Raised when AI agent operations fail"""
    
    def __init__(self, agent_type: str, message: str):
        self.agent_type = agent_type
        super().__init__(f"AI Agent {agent_type}: {message}")


class DatabaseException(GoodlinkException):
    """Raised when database operations fail"""
    pass


class ExternalServiceException(GoodlinkException):
    """Raised when external service calls fail"""
    
    def __init__(self, service: str, message: str):
        self.service = service
        super().__init__(f"{service}: {message}")


class InventoryException(GoodlinkException):
    """Raised when inventory operations fail"""
    pass


class PricingException(GoodlinkException):
    """Raised when pricing operations fail"""
    pass


class ContentGenerationException(GoodlinkException):
    """Raised when content generation fails"""
    pass


class TranslationException(GoodlinkException):
    """Raised when translation services fail"""
    pass