const express = require('express');
const AuthController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

// Create a router instance
const router = express.Router();

/**
 * POST /api/auth/register
 * Register a new user
 * 
 * Request body should contain:
 * {
 *   "name": "John Doe",
 *   "email": "john@example.com", 
 *   "password": "securePassword123"
 * }
 * 
 * Response:
 * Success (201): {
 *   "success": true,
 *   "message": "User registered successfully",
 *   "user": {
 *     "id": 1,
 *     "name": "John Doe",
 *     "email": "john@example.com",
 *     "created_at": "2024-01-01T00:00:00.000Z"
 *   }
 * }
 * 
 * Error (400/409/500): {
 *   "success": false,
 *   "message": "Error description"
 * }
 */
router.post('/register', AuthController.register);

/**
 * POST /api/auth/login
 * Login a user
 * 
 * Request body should contain:
 * {
 *   "email": "john@example.com",
 *   "password": "securePassword123"
 * }
 * 
 * Response:
 * Success (200): {
 *   "success": true,
 *   "message": "Login successful",
 *   "user": {
 *     "id": 1,
 *     "name": "John Doe",
 *     "email": "john@example.com",
 *     "created_at": "2024-01-01T00:00:00.000Z"
 *   }
 * }
 * 
 * Error (400/401/500): {
 *   "success": false,
 *   "message": "Error description"
 * }
 */
router.post('/login', AuthController.login);

/**
 * POST /api/auth/reset-password
 * Reset user password using a token
 * 
 * Request body:
 * {
 *   "token": "resetTokenHere",
 *   "newPassword": "newPassword123"
 * }
 * 
 * Response:
 * Success (200): {
 *   "success": true,
 *   "message": "Password has been reset successfully"
 * }
 * 
 * Error (400/500): {
 *   "success": false,
 *   "message": "Error description"
 * }
 */
router.post('/reset-password', AuthController.resetPassword);
router.post('/forgot-password', AuthController.forgotPassword);

/**
 * GET /api/auth/profile
 * Get the details of the currently logged-in user
 * Requires authentication token in Authorization header
 * 
 * Headers:
 * Authorization: Bearer <jwt_token>
 * 
 * Response:
 * Success (200): {
 *   "success": true,
 *   "message": "User profile retrieved successfully",
 *   "user": {
 *     "id": 1,
 *     "name": "John Doe",
 *     "email": "john@example.com",
 *     "created_at": "2024-01-01T00:00:00.000Z"
 *   }
 * }
 * 
 * Error (401/403/404/500): {
 *   "success": false,
 *   "message": "Error description"
 * }
 */
router.get('/profile', authenticateToken, AuthController.getProfile);

module.exports = router;
