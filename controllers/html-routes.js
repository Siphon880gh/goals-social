const router = require('express').Router();
const sequelize = require('../config/connection');
const { User } = require('../models');

// Set your website's name
global.CONSTANT_SITE_TITLE = "Goals Social";

// Workaround when you're at /post/:postId, and clicking another link like /dashboard goes to /post/dashboard
// Then it will redirect one level up to get rid of /post so you can arrive to /dashboard
router.get('/posts/posts', (req, res) => {
    res.redirect("../posts");
    return;
});
router.get('/posts/login', (req, res) => {
    res.redirect("../login");
    return;
});
router.get('/posts/signup', (req, res) => {
    res.redirect("../signup");
    return;
});
router.get('/posts/dashboard', (req, res) => {
    res.redirect("../dashboard");
    return;
});

// HTML routes
router.get('/', async(req, res) => {
    // TODO

    let dataStraightThrough = {};
    dataStraightThrough.pageTitle = global.CONSTANT_SITE_TITLE;
    dataStraightThrough.username = req.session && req.session.user ? req.session.user.username : null;
    if (dataStraightThrough.username) {
        res.render("homepage", dataStraightThrough);
    } else {
        res.redirect('/login')
    }
});

//Chatroom route
router.get('/chatroom', (req, res) => {
    let dataStraightThrough = {};
    dataStraightThrough.pageTitle = global.CONSTANT_SITE_TITLE;
    dataStraightThrough.username = req.session && req.session.user ? req.session.user.username : null;
    if (dataStraightThrough.username) {
        res.render('chatroom', dataStraightThrough);
    } else {
        res.redirect('/login')
    }
});

router.get('/dashboard', (req, res) => {
    // User must be logged in to view personal dashboard
    if (!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }

    var genericData = {
        pageTitle: "Your Details",
        username: req.body.username
    }
    res.render("dashboard", genericData);
});

router.get('/login', (req, res) => {
    // If already logged in, then homepage
    // if (req.session.loggedIn) {
    //     res.redirect('/');
    //     return;
    // }

    let dataStraightThrough = {};
    dataStraightThrough.pageTitle = global.CONSTANT_SITE_TITLE;
    dataStraightThrough.username = req.session && req.session.user ? req.session.user.username : null;

    res.render("login", dataStraightThrough);
});


router.get('/signup', (req, res) => {
    let dataStraightThrough = {};
    dataStraightThrough.pageTitle = global.CONSTANT_SITE_TITLE;
    dataStraightThrough.username = req.session && req.session.user ? req.session.user.username : null;

    res.render("signup", dataStraightThrough);
});

router.get('/logout', (req, res) => {
    res.redirect("/api/logout");
});

module.exports = router;