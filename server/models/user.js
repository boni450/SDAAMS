'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Comment)
      this.hasMany(models.Announcement)
      this.hasMany(models.Notification)
      this.hasMany(models.Appointment, {
        foreignKey: 'ownerId',
        targetKey: 'id',
      })
      this.hasMany(models.Chat, {
        foreignKey: 'senderId',
        targetKey: 'id',
      })
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.ENUM('user', 'admin', 'staff'),
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  )
  return User
}
