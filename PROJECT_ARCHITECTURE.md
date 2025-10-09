# PJV Backend - Complete Architecture Explanation

## 🏗️ Project Structure Overview

```
PJV_Backend/
├── 📁 config/           # Database configuration
│   └── database.js      # MySQL connection setup
├── 📁 controllers/      # Business logic layer
│   └── authController.js # User registration logic
├── 📁 models/          # Data layer
│   └── User.js         # User database operations
├── 📁 routes/          # URL routing layer
│   └── auth.js         # API endpoints
├── 📁 middleware/      # (Empty - we removed unused files)
├── 📁 utils/           # (Empty - for future utilities)
├── 📄 index.js         # Main server file (Entry point)
├── 📄 package.json     # Dependencies and scripts
├── 📄 .env             # Environment variables
├── 📄 .gitignore       # Files to ignore in git
└── 📄 README.md        # Project documentation
```

## 🔄 How Everything Works Together

### 1. Server Startup (index.js)
```
User runs: npm run dev
↓
Node.js starts index.js
↓
dotenv loads environment variables
↓
Express server starts on port 3000
↓
Routes are registered
↓
Server is ready to accept requests
```

### 2. API Request Flow
```
POST /api/auth/register
↓
Express routes request to auth.js
↓
auth.js calls AuthController.register()
↓
Controller validates input data
↓
Controller calls User.create() method
↓
User model connects to MySQL database
↓
User data is saved to database
↓
Response sent back to client
```

## 🎯 Detailed Component Explanation

### 📄 index.js (Main Server File)
- **Purpose**: Entry point of the application
- **What it does**:
  - Loads environment variables
  - Creates Express app
  - Sets up middleware (CORS, JSON parsing)
  - Defines basic routes (/, /health)
  - Connects API routes
  - Starts the server

### 🔗 routes/auth.js (API Routes)
- **Purpose**: Defines API endpoints
- **What it does**:
  - Creates router for authentication
  - Maps POST /register to AuthController.register
  - Handles URL routing

### 🎮 controllers/authController.js (Business Logic)
- **Purpose**: Contains the "brain" of registration
- **What it does**:
  - Validates user input (name, email, password)
  - Checks if email already exists
  - Hashes password for security
  - Calls User model to save data
  - Returns success/error responses

### 🗄️ models/User.js (Database Layer)
- **Purpose**: Handles all database operations
- **What it does**:
  - Connects to MySQL database
  - Creates new users
  - Finds users by email
  - Checks for duplicate emails

### ⚙️ config/database.js (Database Configuration)
- **Purpose**: Sets up MySQL connection
- **What it does**:
  - Reads database credentials from .env
  - Creates connection pool
  - Tests database connection
  - Exports database connection for use

## 🔄 Complete Registration Flow

1. **User sends POST request** to `/api/auth/register`
2. **Express receives request** and routes it to `auth.js`
3. **Route handler** calls `AuthController.register()`
4. **Controller validates**:
   - All fields present (name, email, password)
   - Email format is valid
   - Email doesn't already exist
5. **Password is hashed** using bcrypt
6. **User model** connects to MySQL database
7. **User data is saved** to `users` table
8. **Success response** is sent back to user

## 🛠️ Technologies Used

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MySQL2**: Database driver
- **bcrypt**: Password hashing
- **dotenv**: Environment variable management
- **cors**: Cross-origin resource sharing
- **nodemon**: Development auto-reload

## 🔧 Environment Variables (.env)

- **PORT**: Server port (3000)
- **DB_HOST**: Database host (localhost)
- **DB_USER**: Database username (root)
- **DB_PASSWORD**: Database password
- **DB_NAME**: Database name (pjv_database)
- **JWT_SECRET**: For future authentication tokens

## 📊 Database Schema

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🚀 How to Run the Project

1. **Install dependencies**: `npm install`
2. **Set up environment**: Copy `.env.example` to `.env`
3. **Configure database**: Update `.env` with your MySQL credentials
4. **Create database**: Run `database_setup.sql` in MySQL
5. **Start server**: `npm run dev`
6. **Test API**: Use Postman or curl

## 🧪 Testing the API

### Using Postman:
- **URL**: `POST http://localhost:3000/api/auth/register`
- **Headers**: `Content-Type: application/json`
- **Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### Expected Response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

## 🔒 Security Features

- **Password Hashing**: Passwords are hashed with bcrypt
- **Input Validation**: All inputs are validated
- **Duplicate Prevention**: Email uniqueness is enforced
- **Error Handling**: Comprehensive error responses
- **Environment Variables**: Sensitive data kept secure

## 🎯 Project Benefits

- **Clean Architecture**: MVC pattern for maintainability
- **Scalable**: Easy to add new features
- **Secure**: Proper password handling and validation
- **Professional**: Industry-standard practices
- **Documented**: Well-commented code
