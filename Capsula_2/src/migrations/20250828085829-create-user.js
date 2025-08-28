'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true, // asigna automáticament el número
        primaryKey: true, // identifica de forma única cada fila
        allowNull: false // no puede quedar vacío
      },
      username: {
        type: Sequelize.STRING(30), // máximo 30 caracteres
        allowNull: false,
        unique: true // no se pueden repetir
      },
      password: {
        type: Sequelize.STRING(72),
        allowNull: false
      },
      level: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1 // todos los usuarios empiezan en nivel 1
      },
      experience: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      createdAt: { allowNull: false, type: Sequelize.DATE }, // timestamps automáticos
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};