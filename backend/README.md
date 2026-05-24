# E-Commerce Backend API

Backend API for the e-commerce application built with Node.js, Express, and MongoDB.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Update the values in `.env`:
     - `MONGODB_URI`: Your MongoDB connection string
     - `JWT_SECRET`: A strong secret key for JWT tokens
     - `PORT`: Server port (default: 5000)

```bash
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication Routes

#### 1. Register User
- **Method:** `POST`
- **URL:** `/api/auth/register`
- **Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-05-24T10:00:00.000Z",
    "updatedAt": "2024-05-24T10:00:00.000Z"
  }
}
```

#### 2. Login User
- **Method:** `POST`
- **URL:** `/api/auth/login`
- **Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-05-24T10:00:00.000Z",
    "updatedAt": "2024-05-24T10:00:00.000Z"
  }
}
```

#### 3. Get Current User (Protected Route)
- **Method:** `GET`
- **URL:** `/api/auth/me`
- **Headers:**
```
Authorization: Bearer <token>
```
- **Response:**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-05-24T10:00:00.000Z",
    "updatedAt": "2024-05-24T10:00:00.000Z"
  }
}
```

#### 4. Health Check
- **Method:** `GET`
- **URL:** `/api/health`
- **Response:**
```json
{
  "success": true,
  "message": "Server is running"
}
```

## Features

✅ User Registration with email validation
✅ User Login with password hashing
✅ JWT Token Authentication
✅ Password encryption using bcryptjs
✅ MongoDB integration with Mongoose
✅ Error handling
✅ CORS enabled for frontend integration
✅ Environment variables configuration

## Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   └── authController.js     # Authentication logic
├── middleware/
│   └── auth.js              # JWT authentication middleware
├── models/
│   └── User.js              # User schema and model
├── routes/
│   └── auth.js              # Authentication routes
├── server.js                # Main server file
├── package.json             # Dependencies
├── .env                     # Environment variables
├── .env.example             # Environment variables template
└── .gitignore              # Git ignore file
```

## Testing with cURL or Postman

### Register a new user:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Get current user (replace TOKEN with actual token):
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer TOKEN"
```

## Security Features

- Passwords are hashed using bcryptjs (10 salt rounds)
- JWT tokens expire after 30 days
- Email validation using regex
- Protected routes require valid JWT token
- CORS enabled for safe cross-origin requests

## MongoDB Setup

### Local MongoDB
```bash
# Windows (if MongoDB is installed)
mongod

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### MongoDB Atlas (Cloud)
1. Create an account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get your connection string
4. Add it to your `.env` file as `MONGODB_URI`

## Error Handling

All endpoints return standardized error responses:
```json
{
  "success": false,
  "message": "Error message here"
}
```

## Next Steps

- Add password reset functionality
- Implement email verification
- Add more routes for products, cart, and orders
- Implement rate limiting
- Add input validation and sanitization
- Set up database indexes for better performance
- Deploy to production (Heroku, AWS, etc.)

## License

ISC
