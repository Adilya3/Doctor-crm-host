'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hystory extends Model {
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
  Hystory.init({
    patient_id: DataTypes.INTEGER,
    simptoms: DataTypes.STRING,
    press_diagnos: DataTypes.STRING,
    diagnos: DataTypes.STRING,
    receipt_date: DataTypes.STRING,
    exctract_date: DataTypes.STRING,
    palata: DataTypes.STRING,
    doctor: DataTypes.STRING,
    from_who: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Hystory',
  });
  return Hystory;
};