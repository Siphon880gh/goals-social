const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const Sequelize = require("sequelize");
const sequelizeConnection = require('../config/connection');

class Posts extends Model {}
Posts.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    goal: {
        type: DataTypes.STRING,
        allowNull: false
    },
    detail: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "default"
    },
    start: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    end: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
            // defaultValue: moment(new Date()).add(30, "days").format("M/D/YYYY H:m:SS")
    },
    createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
    },
    updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
    },
}, {
    sequelize: sequelizeConnection,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'posts'
});

module.exports = Posts;