/**
 * Workaround with the error that says Session doesn't exist
 */

const { Model, DataTypes } = require('sequelize');
const sequelizeConnection = require('../config/connection')

const Session = sequelizeConnection.define('Session', {
    sid: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    expires: {
        type: DataTypes.DATE
    },
    data: {
        // type: DataTypes.STRING(50000) // Error: Too big for column
        type: DataTypes.TEXT
    }
}, {
    tableName: 'Session',
    sequelize: sequelizeConnection,
});

module.exports = Session;