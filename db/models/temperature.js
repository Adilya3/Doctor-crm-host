'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Temperature extends Model {
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
  Temperature.init({
    patient_id: DataTypes.INTEGER,
    morning: DataTypes.ARRAY(DataTypes.FLOAT),
    evening: DataTypes.ARRAY(DataTypes.FLOAT),
    date_inspection: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'Temperature',
  });
  return Temperature;
};