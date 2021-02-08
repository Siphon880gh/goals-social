const Sequelize = require('sequelize');

require('dotenv').config();

// Debug: Not connecting? See if you have an .env file or if the .env file is recognized
// console.log({
//     DB_NAME: process.env.DB_NAME,
//     DB_USER: process.env.DB_USER,
//     DB_PW: process.env.DB_PW,
//     DB_PORT: process.env.DB_PORT
// });
// process.exit(0);

if (!process.env.JAWSDB_URL && (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PW)) {
    console.error("Error connecting to database:\n- If on Heroku, make sure to install Jaws DB for MySql addon.\n- If on localhost, make sure you created .env file with the variables DB_NAME, DB_USER, DB_PW, and optionally DB_PORT. Place .env file at root.");
    process.exit(0);
}

// create connection to our db
const sequelize = process.env.JAWSDB_URL ?
    new Sequelize(process.env.JAWSDB_URL) :
    new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: process.env.DB_PORT || 3006
    });

module.exports = sequelize;
