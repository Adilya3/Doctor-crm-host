'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pulse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Patient}) {
      // define association here
      this.belongsTo(Patient,{foreignKey:'patient_id'})
    }
  }
  Pulse.init({
    patient_id: DataTypes.INTEGER,
    morning: DataTypes.ARRAY(DataTypes.INTEGER),
    evening: DataTypes.ARRAY(DataTypes.INTEGER),
    date_inspection: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'Pulse',
  });
  return Pulse;
};