'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'Raul Vidal',
        password: '123456',
        level: 1,
        experience: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'Bernardo Sanchez',
        password: 'abcdef',
        level: 2,
        experience: 60,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'Sofia Perez',
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
      },
      {
        title: 'Lavar el auto',
        description: 'Usar jabón especial',
        status: 'ACTIVE',
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Preparar presentación',
        description: 'Diapositivas para la reunión',
        status: 'ACTIVE',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Leer un libro',
        description: 'Capítulo 5 de Clean Code',
        status: 'ACTIVE',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Cocinar cena',
        description: 'Pasta con salsa casera',
        status: 'ACTIVE',
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Pagar cuentas',
        description: 'Luz y agua en línea',
        status: 'COMPLETED',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Ir al supermercado',
        description: 'Comprar verduras y frutas',
        status: 'COMPLETED',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Enviar correo',
        description: 'Responder a cliente importante',
        status: 'COMPLETED',
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Hacer backup',
        description: 'Respaldar archivos del proyecto',
        status: 'COMPLETED',
        userId: 1,
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
