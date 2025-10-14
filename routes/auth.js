const express = require('express');
const AuthController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');
const upload = require('../middleware/uploadProfilePhoto');

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
 *     "created_at": "2024-01-01T00:00:00.000Z",
 *     "avatarUrl": "http://<host>/uploads/avatar-1234567890.png",
 *     "addresses": [
 *       {
 *         "id": 1,
 *         "type": "home",
 *         "name": "John Doe",
 *         "phone": "123-456-7890",
 *         "addressLine1": "123 Main St",
 *         "addressLine2": "Apt 4B",
 *         "city": "New York",
 *         "state": "NY",
 *         "pincode": "10001"
 *       }
 *     ]
 *   }
 * }
 * 
 * Error (401/403/404/500): {
 *   "success": false,
 *   "message": "Error description"
 * }
 */
router.get('/profile', authenticateToken, AuthController.getProfile);

/** PUT /api/auth/profile
 * Update the profile of the currently logged-in user
 * Requires authentication token in Authorization header
 * 
 * Headers:
 * Authorization: Bearer <jwt_token>
 * 
 * Request body can contain any of the following fields to update:
 * {
 *   "name": "New Name",
 *   "email": "newemail@example.com",
 *   "phone": "123-456-7890"
 * }
 */
router.put('/update-profile', authenticateToken, AuthController.updateProfile);

/** POST /api/auth/avatar
 * Upload a new profile avatar
 * Requires authentication token in Authorization header
 * 
 * Headers:
 * Authorization: Bearer <jwt_token>
 * 
 * Request body:
 * - Form-data with file upload
 */
router.post('/avatar', authenticateToken, upload.single('avatar'), AuthController.uploadAvatar);

/** POST /api/auth/user-address
 * Add or update user address
 * Requires authentication token in Authorization header
 * 
 * Headers:
 * Authorization: Bearer <jwt_token>
 * 
 * Request body:
 * {
 *   "type": "home", // or "work"   
 *   "name": "John Doe",
 *   "phone": "123-456-7890",
 *   "addressLine1": "123 Main St",
 *   "addressLine2": "Apt 4B",
 *   "city": "New York",
 *   "state": "NY",
 *   "pincode": "10001"
 * }
 */     
router.post('/user-address', authenticateToken, AuthController.saveOrUpdateAddress);

module.exports = router;
