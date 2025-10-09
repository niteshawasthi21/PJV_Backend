const mysql = require('mysql2');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'pjv_database',
  port: parseInt(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'
};

// Debug: Log the configuration (without showing password)
console.log('🔍 Database config:', {
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password ? '***SET***' : 'NOT SET',
  database: dbConfig.database,
  port: dbConfig.port
});

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Create promise-based pool
const promisePool = pool.promise();

// Test database connection
const testConnection = async () => {
  try {
    // First, try to connect without specifying database
    const connection = mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: process.env.DB_PORT || 3306
    });

    console.log('🔍 Testing connection without database...');
    
    // Test basic connection
    await new Promise((resolve, reject) => {
      connection.connect((err) => {
        if (err) {
          reject(err);
        } else {
          console.log('✅ Basic MySQL connection successful!');
          resolve();
        }
      });
    });

    // Try to create database if it doesn't exist
    console.log(`🔍 Creating database '${process.env.DB_NAME || 'pjv_database'}' if it doesn't exist...`);
    await new Promise((resolve, reject) => {
      connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'pjv_database'}`, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log('✅ Database is ready!');
          resolve();
        }
      });
    });

    connection.end();

    // Now test with pool
    const poolConnection = await promisePool.getConnection();
    console.log('✅ Pool connection successful!');
    poolConnection.release();

  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('Full error:', error);
    // Don't exit in development, just warn
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

// Initialize database connection
// testConnection(); // Disabled for now - will be tested when API is called

module.exports = {
  pool,
  promisePool
};
