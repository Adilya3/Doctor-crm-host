'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Patient, Refresh_tk }) {
            // define association here
            this.hasOne(Refresh_tk, {foreignKey:'user_id'})
            this.hasMany(Patient, { foreignKey: 'user_id' })
        }
    }
    User.init(
        {
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            prof: DataTypes.STRING,
            password: DataTypes.STRING,
            gender: DataTypes.STRING,
            department: DataTypes.STRING,
            email:DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'User',
        }
    )
    return User
}
