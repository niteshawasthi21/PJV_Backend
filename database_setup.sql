-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS pjv_database;

-- Use the database
USE pjv_database;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    reset_token VARCHAR(255) DEFAULT NULL,
    avatar VARCHAR(255) DEFAULT NULL,
    phone VARCHAR(20) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create users_address table
CREATE TABLE IF NOT EXISTS users_address (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    type VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_address_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create an index on user_id for faster lookups
CREATE INDEX idx_users_address_user_id ON users_address(user_id);

-- Show the table structure
DESCRIBE users;
