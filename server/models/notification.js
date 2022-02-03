'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User)
    }
  }
  Notification.init(
    {
      message: DataTypes.TEXT,
      link: DataTypes.STRING,
      isSeen: DataTypes.BOOLEAN,
      userId: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: 'Notification',
    }
  )
  return Notification
}
