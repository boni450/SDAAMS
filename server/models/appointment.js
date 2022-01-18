'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'ownerId', sourceKey: 'id' })
    }
  }
  Appointment.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      color: DataTypes.STRING,
      isApproved: DataTypes.BOOLEAN,
      ownerId: DataTypes.INTEGER,
      approverId: DataTypes.INTEGER,
      endDate: DataTypes.DATE,
      startDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Appointment',
    }
  )
  return Appointment
}
