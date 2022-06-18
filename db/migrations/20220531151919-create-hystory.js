'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Hystories', {
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
      simptoms: {
        type: Sequelize.STRING
      },
      press_diagnos: {
        type: Sequelize.STRING
      },
      diagnos: {
        type: Sequelize.STRING
      },
      receipt_date: {
        type: Sequelize.STRING
      },
      exctract_date: {
        type: Sequelize.STRING
      },
      palata: {
        type: Sequelize.STRING
      },
      doctor: {
        type: Sequelize.STRING
      },
      from_who: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Hystories');
  }
};