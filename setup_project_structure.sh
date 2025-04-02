#!/bin/bash

# Create backend directory structure
mkdir -p backend/app/routers
mkdir -p backend/app/models
mkdir -p backend/app/schemas
mkdir -p backend/app/services
mkdir -p backend/app/utils
mkdir -p backend/app/middleware
mkdir -p backend/tests
touch backend/app/__init__.py
touch backend/app/routers/__init__.py
touch backend/app/models/__init__.py
touch backend/app/schemas/__init__.py
touch backend/app/services/__init__.py
touch backend/app/utils/__init__.py

# Create frontend directory structure
mkdir -p frontend/public
mkdir -p frontend/src/components
mkdir -p frontend/src/pages
mkdir -p frontend/src/utils
mkdir -p frontend/src/context
mkdir -p frontend/src/api
touch frontend/src/App.js
touch frontend/src/index.js

# Create database directory
mkdir -p database/migrations
mkdir -p database/scripts

echo "Project directory structure created successfully"
