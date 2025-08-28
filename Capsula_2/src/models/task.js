'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task.belongsTo(models.User, {
        as: 'user', 
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
    }
  }
  Task.init({
    title: {
      type: DataTypes.STRING(120),
      allowNull: false,
      validate: { len: [1, 120] },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('ACTIVE', 'COMPLETED', 'DELETED'),
      allowNull: false,
      defaultValue: 'ACTIVE',
      validate: { isIn: [['ACTIVE', 'COMPLETED', 'DELETED']] },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Task',
  });

  return Task;
};