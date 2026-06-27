# Deployment Guide

PortfolioHub uses Docker Compose for unified, predictable deployments.

## Prerequisites
- Docker & Docker Compose installed on your server.
- A domain name pointing to your server's IP address.

## Local Development
To run the entire stack locally:
```bash
docker-compose up --build
```
- Frontend will be available at `http://localhost:80`
- Backend API will be available at `http://localhost:8000`

## Production Deployment
1. Clone the repository on your production server.
2. Ensure you have mapped `VITE_API_URL` in your frontend `.env` to your production backend URL.
3. Update `JWT_SECRET_KEY` in your backend `.env` to a secure random string.
4. Run:
```bash
docker-compose -f docker-compose.yml up -d --build
```

## Continuous Integration (CI/CD)
This repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically:
- Tests the codebase using `pytest` and `npm run build`.
- Builds the production Docker images.
