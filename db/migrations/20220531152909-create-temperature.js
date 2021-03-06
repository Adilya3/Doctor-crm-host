'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Temperatures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      patient_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Patients",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      morning: {
        type: Sequelize.ARRAY(Sequelize.FLOAT)
      },
      evening: {
        type: Sequelize.ARRAY(Sequelize.FLOAT)
      },
      date_inspection:{
        type:Sequelize.ARRAY(Sequelize.STRING)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Temperatures');
  }
};