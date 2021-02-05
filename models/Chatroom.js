const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelizeConnection = require('../config/connection');

// create our User model
class Chatroom extends Model {}

// create fields/columns for User model
Chatroom.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {

    sequelize: sequelizeConnection,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'chatroom'
});

module.exports = Chatroom;