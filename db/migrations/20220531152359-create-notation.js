'use strict'
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Notations', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            patient_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Patients',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            medical: {
                type: Sequelize.STRING,
            },
            notes: {
                type: Sequelize.STRING,
            },
            date_inspection: {
                type: Sequelize.STRING,
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
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Notations')
    },
}
