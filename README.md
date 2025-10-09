# PJV Backend

A Node.js backend API built with Express.js for the PJV (Project Name) application.

## 🚀 Features

- **Express.js** - Fast, unopinionated web framework
- **MySQL** - Database connectivity with connection pooling
- **JWT Authentication** - Secure token-based authentication
- **CORS** - Cross-origin resource sharing support
- **Environment Configuration** - Environment-based configuration management
- **Structured Architecture** - Organized folder structure for scalability
- **Error Handling** - Comprehensive error handling middleware
- **Validation** - Request validation middleware

## 📁 Project Structure

```
PJV_Backend/
├── config/           # Database and app configuration
├── controllers/      # Route controllers
├── middleware/       # Custom middleware (auth, validation)
├── models/          # Database models
├── routes/          # API routes
├── utils/           # Utility functions
├── index.js         # Main application entry point
├── package.json     # Dependencies and scripts
└── README.md        # Project documentation
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PJV_Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy the example environment file
   cp env.example .env
   
   # Edit .env with your configuration
   # Update database credentials, JWT secret, etc.
   ```

4. **Database Setup**
   - Create a MySQL database
   - Update database credentials in `.env` file
   - The application will test the connection on startup

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
This will start the server with nodemon for automatic reloading on file changes.

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## 📋 Available Endpoints

### Base Endpoints
- `GET /` - Welcome message and server status
- `GET /health` - Health check endpoint
- `GET /api/info` - API information

### API Structure
All API routes are prefixed with `/api/` and organized by feature.

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `NODE_ENV` | Environment mode | development |
| `DB_HOST` | Database host | localhost |
| `DB_USER` | Database username | root |
| `DB_PASSWORD` | Database password | (empty) |
| `DB_NAME` | Database name | pjv_database |
| `DB_PORT` | Database port | 3306 |
| `JWT_SECRET` | JWT signing secret | your-secret-key |
| `JWT_EXPIRES_IN` | JWT expiration time | 7d |
| `CORS_ORIGIN` | CORS allowed origin | http://localhost:4200 |

## 🗄️ Database

This project uses MySQL with the following features:
- Connection pooling for better performance
- Automatic connection testing
- Promise-based queries
- Environment-based configuration

## 🔐 Authentication

JWT-based authentication is implemented with:
- Token generation and verification
- Protected route middleware
- Optional authentication for public routes
- Secure token handling

## 🧪 Development

### Adding New Routes
1. Create route file in `routes/` directory
2. Import and use in `routes/index.js`
3. Add corresponding controller in `controllers/` directory

### Adding Middleware
1. Create middleware file in `middleware/` directory
2. Import and use in `index.js` or specific routes

### Database Models
1. Create model files in `models/` directory
2. Import database connection from `config/database.js`

## 📝 API Documentation

API documentation will be available at `/api/docs` (when implemented).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Happy Coding! 🎉**

