# Camopa Beverages Dealership Management System

A comprehensive dealership management system for Camopa Beverages, allowing users to apply for dealerships, track applications, make payments, and download approval letters. The system includes an admin panel for managing applications, payments, and support requests.

## Features

### User Features
- **Dealership Application**: Multi-step application form with all required fields
- **Application Tracking**: Track application status using tracking ID
- **Payment System**: UPI QR code payment system without payment gateway
- **Approval Letters**: Download approval letters once approved
- **Support Contact**: Reach out to customer support for queries

### Admin Features
- **Dashboard**: Analytics and insights on applications, approvals, and payments
- **Application Management**: View, approve, or reject dealership applications
- **Payment Verification**: Mark payments as received and update payment details
- **Approval Letters**: Generate and manage approval letters
- **Support Management**: Handle customer support requests

## Technology Stack

- **Frontend**: React with Material UI
- **Backend**: FastAPI
- **Database**: PostgreSQL
- **Authentication**: JWT-based authentication for admin users

## Project Structure

```
camopa_dealership/
├── frontend/             # React frontend application
│   ├── public/           # Static files
│   └── src/              # Source code
│       ├── components/   # Reusable components
│       ├── pages/        # Page components
│       ├── utils/        # Utility functions
│       └── context/      # React context providers
├── backend/              # FastAPI backend application
│   ├── app/              # Application code
│   │   ├── routers/      # API routes
│   │   ├── models/       # Database models
│   │   └── schemas/      # Pydantic schemas
│   └── tests/            # Backend tests
├── database/             # Database migrations and scripts
└── docs/                 # Documentation files
```

## Getting Started

### Prerequisites
- Node.js 16+ for frontend
- Python 3.8+ for backend
- PostgreSQL 12+ for database

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Database Setup
```bash
# Create database
sudo -u postgres psql
CREATE DATABASE camopa;
CREATE USER camopauser WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE camopa TO camopauser;
```

## Deployment

See the [Deployment Guide](./docs/deployment_guide.md) for detailed instructions on deploying the system.

## Development

### Git Workflow
See the [Git Setup Guide](./docs/git_setup_guide.md) for information on our Git workflow and best practices.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
