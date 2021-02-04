const Sequelize = require('sequelize');

require('dotenv').config();

// Debug:
// console.log({
//     DB_NAME: process.env.DB_NAME,
//     DB_USER: process.env.DB_USER,
//     DB_PW: process.env.DB_PW,
//     DB_PORT: process.env.DB_PORT
// });

// create connection to our db
const sequelize = process.env.JAWSDB_URL ?
    new Sequelize(process.env.JAWSDB_URL) :
    new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: process.env.DB_PORT || 3306
    });

module.exports = sequelize;

// //import the Sequelize constructor from the library
// const Sequelize = require('sequelize');

// require('dotenv').config();

// //create connection to our database, pass in your MYSQL information for username and password
// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
//     host: 'localhost',
//     dialect: 'mysql',
//     port: 3306
// });

// module.exports = sequelize;