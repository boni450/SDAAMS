'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Chats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false,
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
    await queryInterface.addColumn('Chats', 'senderId', {
      type: Sequelize.BIGINT,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: { model: 'Users', key: 'id' },
    })
    await queryInterface.addColumn('Chats', 'receiverId', {
      type: Sequelize.BIGINT,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: { model: 'Users', key: 'id' },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Chats')
  },
}
