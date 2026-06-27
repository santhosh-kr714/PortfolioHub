from supabase import create_client, Client
from app.core.config import settings

def get_supabase() -> Client:
    # If credentials are empty, this will fail in a real environment
    # But it allows the app to start without valid credentials initially
    url = settings.SUPABASE_URL or "https://placeholder.supabase.co"
    key = settings.SUPABASE_KEY or "placeholder-key"
    return create_client(url, key)

supabase: Client = get_supabase()
