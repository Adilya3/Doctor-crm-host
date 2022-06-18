'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Notation extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Patient }) {
            // define association here
            this.belongsTo(Patient, { foreignKey: 'patient_id' })
        }
    }
    Notation.init(
        {
            patient_id: DataTypes.INTEGER,
            medical: DataTypes.STRING,
            notes: DataTypes.STRING,
            date_inspection: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Notation',
        }
    )
    return Notation
}
