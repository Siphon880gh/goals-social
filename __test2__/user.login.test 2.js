const { Model, DataTypes } = require('sequelize');
const sequelizeConnection = require("../config/connection.js");

// Test Express Route
const request = require('supertest');
var express = require("express");
const User = require("../models/User");
var app = express();
require('mysql2/node_modules/iconv-lite').encodingExists('cesu8');

console.log(`Simulation:
- User logins.`);

beforeAll(async() => {
    console.log("1. Cue the models");
    const Post = require("../models/User");

    console.log("2. Recreate the models");
    await sequelizeConnection.sync({ force: true }).then(() => {
        console.log("2a. Sequelize Resynced.");
    });

    console.log("2. Seed the simulation");
    console.log("2a. Seed the user");
    User.bulkCreate([{
        username: 'testUser', // id 1
        email: 'testUser@domain.com',
        password: 'testUser'
    }]);

    console.log("3. Prepare express route POST /login");
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.post("/login", async(req, res) => {
        const { username, password } = req.body;

        const row = await User.findOne({
            where: {
                username,
                password
            },
            attributes: ["id", "username"]
        }).then(row => {
            if (row) row = row.get({ plain: true });
            return row;
        });
        if (row) {
            const dbUserData = row;
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
            res.json({ loggedIn: 1 });
        } else {
            res.json({ loggedIn: 0 });
            // res.redirect("/login");
        }

    });

}); // beforeAll

describe('Testing login', () => {

    test('Test login with correct credentials', async() => {
        const response = await request(app).post('/login').send({ username: "testUser", password: "testUser" });
        expect(JSON.parse(response.text).loggedIn).toBe(1);
    });

});


afterAll(async() => {
    await sequelizeConnection.close();
    console.info("\x1b[45m%s", " Test2 requires you to drop database between test suites. Test each test suite individually. Otherwise, tests will fail. Example: `npm run test2 post.view`");
});