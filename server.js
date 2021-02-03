// Initiate Express, Sequelize, Moment JS, etc
const express = require("express");
const app = express();
const path = require("path");
const sequelizeConnection = require("./config/connection.js");
const moment = require("moment");


// Initiate Express-Handlebars
const exhbs = require("express-handlebars");
const hbs = exhbs.create({
    // Specify helpers for all of Handlebars.
    // Takes date-time from database and converts to human-readable date
    helpers: {
        date: function(sqlDate) {
            const humanDate = moment(sqlDate).format("M/D/YYYY")
            return humanDate;
        },
        CONSTANT_SITE_TITLE: function() {
            return global.CONSTANT_SITE_TITLE;
        }
    }
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Initiate Session
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: '1db275a51d9eebde91409',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelizeConnection
    })
};

app.use(session(sess));

// Request ready
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Expose CSS and js files
app.use(express.static(path.join(__dirname, "/public")));

// Get routes
app.use(require('./controllers/'));

// Setup 404 page
app.use((req, res, next) => {
    res.status("404").send("We hit a 404 wall").end();
});

// Listen for requests
sequelizeConnection.sync({ force: false }).then(() => {
    let port = process.env.PORT || 3001;
    app.listen(port, () => {
        console.log(`Server listening at ${port}`);
        console.log(`If on localhost, visit: http://localhost:3001/login`);
    });
});