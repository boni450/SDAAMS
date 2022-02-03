'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'senderId', sourceKey: 'id' })
    }
  }
  Chat.init(
    {
      message: DataTypes.TEXT,
      senderId: DataTypes.BIGINT,
      receiverId: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: 'Chat',
    }
  )
  return Chat
}
