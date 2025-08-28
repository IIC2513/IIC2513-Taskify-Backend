'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'raul',
        password: '123456',
        level: 1,
        experience: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'bernardo',
        password: 'abcdef',
        level: 2,
        experience: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'sofia',
        password: 'qwerty',
        level: 3,
        experience: 120,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    await queryInterface.bulkInsert('Tasks', [
      {
        title: 'Comprar pan',
        description: 'Ir a la panadería',
        status: 'ACTIVE',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Estudiar Sequelize',
        description: 'Revisar docs oficiales',
        status: 'COMPLETED',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Hacer ejercicio',
        description: 'Salir a correr 5km',
        status: 'ACTIVE',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
