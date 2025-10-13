const bcrypt = require('bcrypt');
const User = require('../models/User');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

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

  
  /**
   * Login a user
   * Handles user authentication
   */
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // 1. Validate input
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email and password are required'
        });
      }

      // 2. Find user by email
      const user = await User.findByEmail(email.toLowerCase().trim());
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      // 3. Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      // 4. Generate JWT token
      const token = jwt.sign(
        { 
          id: user.id, 
          email: user.email 
        },
        process.env.JWT_SECRET || 'fallback-secret-key',
        { expiresIn: '24h' }
      );

      // 5. Success response (without password)
      res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          created_at: user.created_at
        }
      });

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error during login',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
      });
    }
  }



/**
 * Forgot Password
 * Handles password reset requests by generating a reset token
 */
static async forgotPassword(req, res) {
  try {
    const { email } = req.body;

    // 1. Validate email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // 2. Check if user exists
    const user = await User.findByEmail(email.toLowerCase().trim());
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No account found with that email'
      });
    }

    // 3. Generate a reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    await User.saveResetToken(user.id, resetToken);

    // 4. Respond with the token (for local development)
    res.status(200).json({
      success: true,
      message: 'Password reset token generated (for local development)',
      resetToken
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during password reset',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
}


  /**
 * Reset Password
 * Allows user to set a new password using a valid reset token
 */
static async resetPassword(req, res) {
  try {
    const { token, newPassword } = req.body;

    // 1. Validate input
    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Token and new password are required'
      });
    }

    // 2. Find user by reset token
    const user = await User.findByResetToken(token);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    // 3. Hash new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // 4. Update user's password and clear reset token
    await User.updatePassword(user.id, hashedPassword);
    await User.clearResetToken(user.id);

    res.status(200).json({
      success: true,
      message: 'Password has been reset successfully'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during password reset',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
}

  /**
   * Get user profile
   * Returns the details of the currently logged-in user
   */
  static async getProfile(req, res) {
    try {
      // Get user ID from the authenticated request (set by auth middleware)
      const userId = req.user.id;

      // Find user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Return user details (without password)
      res.status(200).json({
        success: true,
        message: 'User profile retrieved successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          created_at: user.created_at
        }
      });

    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error while retrieving profile',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
      });
    }
  }

}

module.exports = AuthController;
