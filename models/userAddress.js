const { promisePool } = require('../config/database');

class UserAddress {
  static async create(address) {
    const sql = `INSERT INTO users_address
      (user_id, type, name, phone, address_line1, address_line2, city, state, pincode)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [
      address.userId,
      address.type,
      address.name,
      address.phone,
      address.addressLine1,
      address.addressLine2,
      address.city,
      address.state,
      address.pincode
    ];
    return await promisePool.execute(sql, params);
  }

  static async update(id, address) {
    const sql = `UPDATE users_address SET
      user_id = ?, type = ?, name = ?, phone = ?, address_line1 = ?, address_line2 = ?, city = ?, state = ?, pincode = ?
      WHERE id = ?`;
    const params = [
      address.userId,
      address.type,
      address.name,
      address.phone,
      address.addressLine1,
      address.addressLine2,
      address.city,
      address.state,
      address.pincode,
      id
    ];
    return await promisePool.execute(sql, params);
  }

  // Find addresses by user ID
  static async findByUserId(userId) {
  const sql = 'SELECT * FROM users_address WHERE user_id = ?';
  const [rows] = await promisePool.execute(sql, [userId]);
  return rows;
}


  // Additional methods as needed, like findByUserId, delete, etc.
}

module.exports = UserAddress;
