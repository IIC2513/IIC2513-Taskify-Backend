'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,     
        primaryKey: true,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { // crea una FK a Users.id
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE' // si se borra un usuario, se borran sus tareas
      },
      title: {
        type: Sequelize.STRING(120),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT // sin límite de longitud práctico
      },
      status: {
        type: Sequelize.ENUM('ACTIVE', 'COMPLETED', 'DELETED'),
        allowNull: false,
        defaultValue: 'ACTIVE'
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tasks');
  }
};