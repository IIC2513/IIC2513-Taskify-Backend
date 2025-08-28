'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Task, {
        as: 'tasks',
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
    }
  }
  User.init({
    username: { type: DataTypes.STRING(30), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(72), allowNull: false },
    level:    { type: DataTypes.INTEGER,    allowNull: false, defaultValue: 1, 
      validate: { min: 1 } }, 
    experience:{type: DataTypes.INTEGER,    allowNull: false, defaultValue: 0, 
      validate: { min: 0 } },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};