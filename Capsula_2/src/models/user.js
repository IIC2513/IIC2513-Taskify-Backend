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
        as: 'tasks', // alias para acceder a las tareas de un usuario (user.tasks)
        foreignKey: 'userId',
        onDelete: 'CASCADE', // si borras un User, se borran automáticamente sus Tasks
      });
    }
  }
  User.init({
    username: { type: DataTypes.STRING(30), allowNull: false, unique: true },
    // unique es una restricción a nivel de base de datos
    password: { type: DataTypes.STRING(72), allowNull: false },
    level:    { type: DataTypes.INTEGER,    allowNull: false, defaultValue: 1, 
      validate: { min: 1 } }, 
      // validación verifica los datos antes de guardarlos en la BDD
      // es a nivel de sequelize
    experience:{type: DataTypes.INTEGER,    allowNull: false, defaultValue: 0, 
      validate: { min: 0 } }, // evita negativos antes de guardar
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};