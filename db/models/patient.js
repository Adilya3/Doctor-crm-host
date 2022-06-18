'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User,Hystory, Notation, Temperature, Presure, Pulse, Breethe}) {
      // define association here
      this.belongsTo(User, {foreignKey:'user_id'})
      this.hasMany(Hystory, {foreignKey:'patient_id'})
      this.hasMany(Notation, {foreignKey:'patient_id'})
      this.hasMany(Temperature, {foreignKey:'patient_id'})
      this.hasMany(Presure, {foreignKey:'patient_id'})
      this.hasMany(Pulse, {foreignKey:'patient_id'})
      this.hasMany(Breethe, {foreignKey:'patient_id'})
    }
  }
  Patient.init({
    user_id: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    birthDay: DataTypes.STRING,
    insurance_number: DataTypes.INTEGER,
    category_patient: DataTypes.STRING,
    address: DataTypes.STRING,
    passport: DataTypes.STRING,
    job: DataTypes.STRING,
    group_blood: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};