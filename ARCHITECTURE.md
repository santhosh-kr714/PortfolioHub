# Architecture Overview

PortfolioHub uses a modern, decoupled architecture designed for scale, speed, and AI integration.

## Component Diagram

1. **Frontend (React/Vite)**
   - Acts as the presentation layer.
   - Hosted statically or via Nginx (Docker).
   - Manages state via Zustand.
   - Handles dynamic routing (`/:username`) to instantly render portfolios based on backend API responses.

2. **Backend API (FastAPI)**
   - Handles all business logic, authentication, and AI proxying.
   - Connects to SQLite (development) or PostgreSQL (production) via SQLAlchemy ORM.
   - JWT-based stateless authentication.

3. **AI Service Layer**
   - Abstract Factory Pattern: `backend/app/services/ai/`.
   - Providers (OpenAI, Gemini, Claude) are injected dynamically based on the user's `UserAISetting` database record.
   - Prompts are managed via a centralized `PromptManager` class.

## Database ER Diagram (Simplified)
- `users` 1:1 `profiles`
- `users` 1:N `projects`
- `users` 1:N `messages`
- `users` 1:N `analytics`
