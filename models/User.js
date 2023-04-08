const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    //password checker
    checkPassword(userPass) {
        return bcrypt.compareSync(userPass, this.password);
    }
}

//need to create User class
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        username: {
            type: DataTypes.STRING,
            allowNell: false, 
            unique: true
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false, 
            validate: {
                //make sure the pass is longer than 8 characters
                len: [8]
            }
        },
    },
    {
    hooks: {
        beforeCreate: async (newUserData) => {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
        },
        beforeUpdate: async (updatedUserData) => {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
        },
    },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',

    }
)

module.exports = User;