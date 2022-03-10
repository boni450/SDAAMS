'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Appointments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      color: {
        type: Sequelize.STRING,
        defaultValue: 'primary',
      },
      isApproved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      endDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      startDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
    await queryInterface.addColumn('Appointments', 'ownerId', {
      type: Sequelize.BIGINT,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: { model: 'Users', key: 'id' },
    })
    await queryInterface.addColumn('Appointments', 'approverId', {
      type: Sequelize.BIGINT,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: { model: 'Users', key: 'id' },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Appointments')
  },
}
