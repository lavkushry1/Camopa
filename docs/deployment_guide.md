# Camopa Beverages Dealership Management System - Deployment Guide

This document provides instructions for deploying the Camopa Beverages Dealership Management System.

## System Architecture

The Camopa Beverages Dealership Management System consists of three main components:

- **Frontend**: React application with Material UI
- **Backend**: FastAPI server providing RESTful API endpoints
- **Database**: PostgreSQL database for storing application data

## Prerequisites

- Node.js 16+ for frontend
- Python 3.8+ for backend
- PostgreSQL 12+ for database
- Docker and Docker Compose (optional, for containerized deployment)
- A Linux-based server or cloud VM for production deployment

## Frontend Deployment

### Local Development

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

### Production Deployment

1. Build the production bundle:
   ```bash
   cd frontend
   npm run build
   ```

2. Serve the static files using a web server like Nginx:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       root /path/to/frontend/build;
       
       location / {
           try_files $uri /index.html;
       }
       
       location /api {
           proxy_pass http://localhost:8000;
       }
   }
   ```

## Backend Deployment

### Local Development

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the development server:
   ```bash
   uvicorn app.main:app --reload
   ```

### Production Deployment

1. Set up a production-ready server using Gunicorn:
   ```bash
   pip install gunicorn
   gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app
   ```

2. Configure a systemd service for automatic startup:
   ```ini
   [Unit]
   Description=Camopa Backend
   After=network.target

   [Service]
   User=username
   WorkingDirectory=/path/to/backend
   ExecStart=/path/to/venv/bin/gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app
   Restart=on-failure

   [Install]
   WantedBy=multi-user.target
   ```

## Database Setup

1. Install PostgreSQL:
   ```bash
   sudo apt update
   sudo apt install postgresql postgresql-contrib
   ```

2. Create a database and user:
   ```sql
   CREATE DATABASE camopa;
   CREATE USER camopauser WITH PASSWORD 'secure-password';
   GRANT ALL PRIVILEGES ON DATABASE camopa TO camopauser;
   ```

3. Configure database connection in backend `.env` file:
   ```
   DATABASE_URL=postgresql://camopauser:secure-password@localhost/camopa
   ```

## Security Considerations

1. Store sensitive configuration in environment variables
2. Implement HTTPS using Let's Encrypt certificates
3. Set up proper CORS configuration in the backend
4. Implement rate limiting to prevent abuse
5. Use secure password hashing with bcrypt
6. Configure proper JWT token expiration times

## Monitoring and Maintenance

1. Set up application logging with rotation:
   ```bash
   sudo apt install logrotate
   ```

2. Configure automated backups for the database:
   ```bash
   pg_dump camopa > backup_$(date +%Y%m%d).sql
   ```

3. Set up health check endpoints in the API
4. Implement monitoring using Prometheus and Grafana (optional)

## Troubleshooting

### Common Issues

1. **Database Connection Errors**:
   - Check if PostgreSQL service is running
   - Verify database credentials are correct
   - Check network connectivity and firewall rules

2. **Frontend API Connection Issues**:
   - Ensure API endpoint URLs are correctly configured
   - Check CORS settings in backend

3. **Performance Issues**:
   - Monitor server resources (CPU, memory)
   - Check database query performance
   - Consider implementing caching strategies
