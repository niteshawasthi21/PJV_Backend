const { promisePool } = require('../config/database');

/**
 * User Model
 * This class handles all database operations related to users
 */
class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.email = userData.email;
    this.password = userData.password;
    this.created_at = userData.created_at;
  }

  /**
   * Create a new user in the database
   * @param {Object} userData - User data (name, email, password)
   * @returns {Promise<Object>} - Created user data
   */
  static async create(userData) {
    try {
      const { name, email, password } = userData;
      
      // SQL query to insert new user
      const query = `
        INSERT INTO users (name, email, password, created_at) 
        VALUES (?, ?, ?, NOW())
      `;
      
      // Execute the query with user data
      const [result] = await promisePool.execute(query, [name, email, password]);
      
      // Return the created user data (without password)
      return {
        id: result.insertId,
        name,
        email,
        created_at: new Date().toISOString()
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Find a user by email
   * @param {string} email - User's email
   * @returns {Promise<Object|null>} - User data or null if not found
   */
  static async findByEmail(email) {
    try {
      const query = 'SELECT * FROM users WHERE email = ?';
      const [rows] = await promisePool.execute(query, [email]);
      
      // Return first user found or null
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Check if email already exists
   * @param {string} email - Email to check
   * @returns {Promise<boolean>} - True if email exists
   */
  static async emailExists(email) {
    try {
      const user = await this.findByEmail(email);
      return user !== null;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
