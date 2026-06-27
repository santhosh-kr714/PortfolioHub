from typing import Optional
from .provider_base import AIProvider

class MockAIProvider(AIProvider):
    """Fallback mock provider for testing UI before entering real API keys."""
    
    async def generate_text(self, prompt: str, system_prompt: str = None, temperature: float = 0.7) -> str:
        return "This is a mocked AI response. Please configure your API key in settings."
        
    async def stream_text(self, prompt: str, system_prompt: str = None, temperature: float = 0.7):
        words = ["This ", "is ", "a ", "mocked ", "streaming ", "AI ", "response. ", "Please ", "configure ", "your ", "API ", "key."]
        import asyncio
        for word in words:
            await asyncio.sleep(0.1)
            yield word

    async def embed_text(self, text: str) -> list[float]:
        return [0.1, 0.2, 0.3]

def get_ai_provider(provider_name: str, api_key: str, model: str) -> AIProvider:
    """Factory method to get the correct AI provider instance."""
    
    # In a real scenario, we would instantiate the concrete classes here.
    # e.g., if provider_name == 'openai': return OpenAIProvider(api_key, model)
    
    # If no API key is provided, fallback to the Mock provider for UI testing
    if not api_key or api_key == "":
        return MockAIProvider(api_key="mock", model="mock")
        
    # Placeholder for actual integrations (OpenAI, Gemini, Claude)
    # Raising NotImplementedError until we install their respective SDKs
    raise NotImplementedError(f"Provider {provider_name} is not yet implemented.")
