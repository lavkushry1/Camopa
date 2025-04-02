# Campa Beverages Dealership Management System - Deployment Guide

This document provides instructions for deploying the Campa Beverages Dealership Management System.

## System Architecture

The system consists of:
- React frontend with Material UI
- FastAPI backend
- PostgreSQL database
- Authentication system with JWT

## Prerequisites

- Node.js 16+ for the frontend
- Python 3.8+ for the backend
- PostgreSQL 12+ for the database
- npm or yarn package manager

## Frontend Deployment

### Local Development

1. Navigate to the frontend directory:
```
cd /path/to/campa_dealership/frontend
```

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm start
```

### Production Deployment

1. Build the production bundle:
```
npm run build
```

2. The build folder can be deployed to any static hosting service like:
   - Netlify
   - Vercel
   - AWS S3 + CloudFront
   - GitHub Pages

## Backend Deployment

### Local Development

1. Navigate to the backend directory:
```
cd /path/to/campa_dealership/backend
```

2. Create and activate a virtual environment:
```
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```
pip install -r requirements.txt
```

4. Start the development server:
```
uvicorn app.main:app --reload
```

### Production Deployment

1. Set up a production PostgreSQL database

2. Configure environment variables:
```
DATABASE_URL=postgresql://user:password@localhost/campa_db
SECRET_KEY=your_secret_key
ENVIRONMENT=production
```

3. Deploy using one of these options:
   - Docker container on AWS ECS, Google Cloud Run, or Azure Container Instances
   - Heroku
   - DigitalOcean App Platform
   - AWS Elastic Beanstalk

4. For Docker deployment, use the provided Dockerfile:
```
docker build -t campa-backend .
docker run -p 8000:8000 campa-backend
```

## Database Setup

1. Create a PostgreSQL database:
```
createdb campa_db
```

2. Run migrations:
```
cd /path/to/campa_dealership/backend
alembic upgrade head
```

## Security Considerations

- Store sensitive information in environment variables
- Use HTTPS for all communications
- Implement rate limiting for API endpoints
- Regularly update dependencies
- Set up proper CORS configuration

## Monitoring and Maintenance

- Set up logging with a service like Sentry
- Configure performance monitoring
- Create regular database backups
- Establish a CI/CD pipeline for updates

## Troubleshooting

- Check application logs for errors
- Verify database connection
- Ensure all environment variables are correctly set
- Confirm API endpoints are accessible
