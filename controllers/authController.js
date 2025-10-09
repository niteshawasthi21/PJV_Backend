const bcrypt = require('bcrypt');
const User = require('../models/User');

/**
 * Authentication Controller
 * Handles user registration and login logic
 */
class AuthController {
  /**
   * Register a new user
   * This is what happens when someone submits the registration form
   */
  static async register(req, res) {
    try {
      // 1. Get data from the request body
      const { name, email, password } = req.body;

      // 2. Validate that all required fields are provided
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required (name, email, password)',
          required: ['name', 'email', 'password']
        });
      }

      // 3. Validate email format (basic validation)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid email address'
        });
      }

      // 4. Check if email already exists
      const emailExists = await User.emailExists(email);
      if (emailExists) {
        return res.status(409).json({
          success: false,
          message: 'Email already exists. Please use a different email.'
        });
      }

      // 5. Hash the password for security
      // bcrypt creates a secure hash that can't be reversed
      const saltRounds = 10; // How many times to hash (higher = more secure but slower)
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // 6. Create the user in the database
      const userData = {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword
      };

      const newUser = await User.create(userData);

      // 7. Return success response (without password!)
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          created_at: newUser.created_at
        }
      });

    } catch (error) {
      console.error('Registration error:', error);
      
      // Handle specific database errors
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
          success: false,
          message: 'Email already exists'
        });
      }

      // Generic error response
      res.status(500).json({
        success: false,
        message: 'Internal server error during registration',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
      });
    }
  }
}

module.exports = AuthController;
