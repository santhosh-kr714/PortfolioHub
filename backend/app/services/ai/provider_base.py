from abc import ABC, abstractmethod
from typing import AsyncGenerator, Dict, Any

class AIProvider(ABC):
    """
    Abstract Base Class for all AI Providers (OpenAI, Gemini, Claude, etc).
    Ensures all providers implement the same unified interface.
    """
    
    def __init__(self, api_key: str, model: str):
        self.api_key = api_key
        self.model = model

    @abstractmethod
    async def generate_text(self, prompt: str, system_prompt: str = None, temperature: float = 0.7) -> str:
        """Generates a complete text response synchronously (awaitable)."""
        pass

    @abstractmethod
    async def stream_text(self, prompt: str, system_prompt: str = None, temperature: float = 0.7) -> AsyncGenerator[str, None]:
        """Streams text chunks for real-time typing UI."""
        pass
    
    @abstractmethod
    async def embed_text(self, text: str) -> list[float]:
        """Generates embeddings for vector search/RAG."""
        pass
