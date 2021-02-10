const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const Sequelize = require("sequelize");
const sequelizeConnection = require('../config/connection');

class UserInfos extends Model {}
UserInfos.init({
    uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ""
    },
    abbr: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ""
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ""
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ""
    },
    occupation: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ""
    },
    bio: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ""
    },
    linkFacebook: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ""
    },
    linkInstagram: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ""
    },
    linkLinkedin: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ""
    },
    createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
    },
    updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
    }
}, {
    sequelize: sequelizeConnection,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'userInfos'
});

module.exports = UserInfos;