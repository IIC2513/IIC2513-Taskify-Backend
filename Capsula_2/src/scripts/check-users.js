'use strict';

const { sequelize, User, Task } = require('../models');

(async () => {
  try {
    const users = await User.findAll({ raw: true });
    console.log('\n=== Users ===');
    console.table(users);

    const tasks = await Task.findAll({
      attributes: ['id', 'title', 'status', 'userId', 'createdAt'],
      include: [{ model: User, as: 'user', attributes: ['username'] }],
      raw: true,
      nest: true
    });
    console.log('\n=== Tasks (con usuario) ===');
    console.table(
      tasks.map(t => ({
        id: t.id,
        title: t.title,
        status: t.status,
        userId: t.userId,
        username: t.user?.username,
        createdAt: t.createdAt
      }))
    );
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await sequelize.close();
  }
})();
// Ejecutar con: node src/scripts/check-data.js