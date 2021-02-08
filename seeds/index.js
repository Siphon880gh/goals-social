/**
 * Insert some sample posts, comments, and users for testing purposes.
 */

const sequelizeConnection = require('../config/connection');
const { Chatroom, User, Session } = require("../models");

const seedAll = async() => {
    await sequelizeConnection.sync({ force: true });

    console.log("Create sample data for testing purposes");
    console.log("a. Must have users before there are posts");
    await User.bulkCreate([{
        username: "testUser",
        password: "testUser",
    }, {
        username: "testUser2",
        password: "testUser2",
    }, {
        username: "testUser3",
        password: "testUser3",
        avatar: "j"
    }], { individualHooks: true });


    process.exit(0);
};

seedAll();