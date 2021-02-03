const Sequelize = require('sequelize');

require('dotenv').config();

// create connection to our db
const sequelize = process.env.JAWSDB_URL ?
    new Sequelize(process.env.JAWSDB_URL) :
    new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: process.env.DB_PORT || 3006
    });

module.exports = sequelize;