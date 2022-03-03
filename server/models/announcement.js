'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Announcement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User)
    }
  }
  Announcement.init(
    {
      message: DataTypes.TEXT,
      userId: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: 'Announcement',
    }
  )
  return Announcement
}
