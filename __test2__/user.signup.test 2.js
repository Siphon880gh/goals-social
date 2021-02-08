const { Model, DataTypes } = require('sequelize');
const sequelizeConnection = require("../config/connection.js");

// Test Express Route
const request = require('supertest');
var express = require("express");
var app = express();
require('mysql2/node_modules/iconv-lite').encodingExists('cesu8');

// Model
const User = require("../models/User");

console.log(`Simulation:
- User signs up.`);

beforeAll(async() => {
    console.log("1. Cue the models");

    console.log("2. Sequelize");
    await sequelizeConnection.sync({ force: true }).then(() => {
        console.log("2a. Sequelize Resynced.");
    });

    console.log("3. Prepare express route POST /signup");
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.post("/signup", async(req, res) => {
        const { username, password, email } = req.body;

        const userCreated = await User.create({
            username,
            password,
            email
        });
        if (userCreated) {
            // Start session:
            // console.log({ dbUserData });
            // req.session.save(dbUserData => {
            //     req.session.loggedIn = 1;
            //     req.session.user = {
            //         userId: dbUserData.id,
            //         username: dbUserData.username
            //     };
            //     var hour = 24 * 60 * 60 * 1000; // 24 hours
            //     req.session.cookie.expires = new Date(Date.now() + hour);
            //     req.session.cookie.maxAge = hour;
            // }); // save

            // Password is removed before sending response
            delete userCreated.password;

            res.json(userCreated);
        } else {
            res.json({ error: "Unable to create user" });
        }

    });

}); // beforeAll

describe('Testing user signup', () => {

    test('Test user signup', async() => {
        const response = await request(app).post('/signup').send({ username: "testUser", password: "testUser", email: "testUser@domain.com" })
        expect(JSON.parse(response.text)).toHaveProperty("username", "testUser");
        expect(JSON.parse(response.text)).toHaveProperty("email", "testUser@domain.com");
    });

});


afterAll(async() => {
    await sequelizeConnection.close();
    console.info("\x1b[45m%s", " Test2 requires you to drop database between test suites. Test each test suite individually. Otherwise, tests will fail. Example: `npm run test2 post.view`");
});