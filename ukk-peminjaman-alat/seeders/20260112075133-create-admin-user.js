'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const now = new Date();

    try {
      // Try to delete any existing admin user (may fail if FK constraints exist)
      await queryInterface.bulkDelete('users', { username: 'admin' }, {});

      // Insert new admin
      await queryInterface.bulkInsert('users', [{
        username: 'admin',
        email: 'admin@example.com',
        nama_lengkap: 'Administrator Sistem',
        password: hashedPassword,
        role: 'admin',
        created_at: now,
        updated_at: now
      }], {});
    } catch (err) {
      // If delete failed due to FK constraints, update existing admin record instead
      await queryInterface.bulkUpdate(
        'users',
        {
          email: 'admin@example.com',
          nama_lengkap: 'Administrator Sistem',
          password: hashedPassword,
          role: 'admin',
          updated_at: now,
        },
        { username: 'admin' },
        {}
      );
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', { username: 'admin' }, {});
  }
};