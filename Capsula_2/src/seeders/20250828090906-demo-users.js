'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Con bulkInsert le dices a Sequelize: 
    // “inserta de una sola vez todos estos 
    // objetos en la tabla indicada, asigna sus 
    // campos a las columnas correspondientes y 
    // márcalos con createdAt y updatedAt para que
    //  la base quede poblada de forma rápida y consistente”
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
    // borra todos los registros de esta tabla que coincidan con la condición que te paso”.
    await queryInterface.bulkDelete('Tasks', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
