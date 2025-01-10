# Blog Management System

A  RESTful API for managing blog posts with user authentication, authorization, and role-based access control.

## Features

- User authentication using JWT tokens
- Role-based access control (Admin and Editor roles)
- Blog post management with CRUD operations
- PostgreSQL database integration using TypeORM
- API documentation with Swagger
- Redis caching for improved performance
- Containerized with Docker
- Comprehensive test coverage with Jest

## Tech Stack

- Node.js
- PostgreSQL
- TypeORM
- Redis
- Docker
- Jest
- Swagger

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL
- Redis (optional)
- Docker (optional)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

# Application
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=1111
DB_NAME=blogdb

# JWT
JWT_SECRET=yourjwtsecret

# Redis
REDIS_HOST=localhost
REDIS_PASSWORD=1111

## Installation

### Without Docker

1. Clone the repository:
```bash
git clone https://github.com/yourusername/blog-management-system.git
cd blog-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Run database migrations:
```bash
npm run typeorm:run-migrations
```
4. Run seed:
```bash
npm run seed
```

5. Start the application:
```bash
npm run start:dev
```

### With Docker

1. Build and run the containers:
```bash
docker-compose up --build
```

## API Documentation

Once the application is running, access the Swagger documentation at:
```
http://localhost:3000/api/api-docs
```

## API Endpoints

### Authentication

- POST `/users/register` - Register a new user
- POST `/users/login` - Login and receive JWT token

### Blog Posts

- GET `/blogs` - Get all blog posts (paginated)
- GET `/blogs/:id` - Get a specific blog post
- POST `/blogs` - Create a new blog post (Admin/Editor)
- PUT `/blogs/:id` - Update a blog post (Admin/Editor)
- DELETE `/blogs/:id` - Delete a blog post (Admin only)

## Role-Based Access Control

The system implements two roles:

1. **Admin**
   - Full access to all endpoints
   - Can create, read, update, and delete blogs
   - Can manage users

2. **Editor**
   - Can create and update blogs
   - Can read all blogs
   - Cannot delete blogs or manage users

## Testing

Run the test suite:

```bash
# Unit tests
npm run test
```

## Deployment

### API Deployment (Render/Railway)

1. Fork this repository
2. Connect your Render/Railway account to your GitHub repository
3. Configure the environment variables
4. Deploy the application

### Database Deployment (ElephantSQL/Neon)

1. Create a new database instance
2. Update the database connection variables in your deployment environment

