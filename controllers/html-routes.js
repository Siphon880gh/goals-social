const router = require('express').Router();
const sequelize = require('../config/connection');
const {
    User,
    Posts,
    Comments,
    Milestones,
    UserInfos
} = require('../models');

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


/** Edit Profile */
router.get('/profile/edit', async(req, res) => {
    // User must be logged in to view personal dashboard
    if (!req.session.loggedIn) {
        res.redirect("/login");
        return;
    }

    var userId = req.session.user.userId;
    // console.assert(userId === 1, userId);

    var userInfo = await UserInfos.findOne({ where: { uid: userId } })
        .then(row => row.get({ plain: true }))
        .catch(err => {
            console.error(err);
            return;
        });

    // Retrofit for template
    var userInfoWrapper = {};
    if (userInfo)
        userInfoWrapper = Object.assign({}, userInfo)

    // Avatar choices
    userInfoWrapper.avatars = [
        { avatar: "default" },
        { avatar: "a" },
        { avatar: "b" },
        { avatar: "c" },
        { avatar: "d" },
        { avatar: "e" },
        { avatar: "f" },
        { avatar: "g" },
        { avatar: "h" },
        { avatar: "i" },
        { avatar: "j" },
        { avatar: "k" },
        { avatar: "l" },
        { avatar: "m" },
        { avatar: "n" },
        { avatar: "o" },
        { avatar: "p" },
        { avatar: "q" }
    ]

    userInfoWrapper.pageTitle = "Edit Profile";
    userInfoWrapper.username = req.session.user.username;

    // console.log(JSON.stringify(userInfoWrapper));
    // process.exit(0);

    res.render("edit-profile", userInfoWrapper);
});

/** View any profile */
router.get('/profile/:userId', async(req, res) => {
    var userId = req.params.userId;
    userId = parseInt(userId);
    // console.assert((userId + "").length, userId);
    // console.assert(userId === 1, userId);

    // Prepare profile wrapper which will have user info and personal posts
    var profileWrapper = {
        viewingOwnProfile: false,
        userInfo: {},
        posts: []
    }

    // Allow to edit own profile?
    var viewingOwnProfile = req.session && req.session.user && userId === req.session.user.userId
    profileWrapper.viewingOwnProfile = viewingOwnProfile;

    // Set userInfo or falsy
    var userInfo = await UserInfos.findOne({ where: { uid: userId } })
        .then(row => row.get({ plain: true }))
        .catch(err => {
            console.error(err);
            return;
        });
    profileWrapper.userInfo = userInfo;
    // console.log(userInfo);
    // process.exit(0);

    // console.table({ Posts.findAll });
    // process.exit(0);

    // Set posts with all its joined comments, milestones, usernames, avatars (of owner and commenters)
    var docs = await Posts.findAll({
        where: {
            user_id: userId
        },
        include: [{
            model: User,
            attributes: ["id", "username", "avatar"]
        }, {
            model: Comments,
            attributes: [
                ["id", "comment_id"], "comment", ["user_id", "assoc_user_id"], "created_at", "updated_at"
            ],
            include: {
                model: User,
                attributes: [
                    ["id", "assoc_user_id"], "username", "avatar", "created_at", "updated_at"
                ],
            }
        }, {
            model: Milestones
        }, ],
    }).then(rows => {
        rows = rows.map(row => { // for every single post
            var row = row.get({ plain: true });

            // Post level
            var { id, username, avatar } = row.user;
            delete row.user;
            row.user_id = id;
            row.post_username = username;
            row.avatar = avatar;

            // Post -> Comments[] -> Comment object level
            row.comments = row.comments.map(comment => {
                var { username, avatar, assoc_user_id } = comment.user;
                delete comment.user;
                comment.username = username;
                comment.avatar = avatar;
                comment.assoc_user_id = assoc_user_id;
                return comment;
            });

            row.canComment = Boolean(req.session.loggedIn);
            return row;
        });
        return rows;
    }).catch(err => {
        console.error(err);
        return;
    });
    // console.log(JSON.stringify(docs));
    // process.exit(0);

    profileWrapper.posts = docs;
    profileWrapper.canComment = Boolean(req.session.loggedIn)

    profileWrapper.pageTitle = "Your Details";
    res.render("profile", profileWrapper);

}); // profile

/** View own profile */
router.get('/profile', async(req, res) => {
    // User must be logged in to view personal dashboard
    if (!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }

    // debugger;
    var userId = req.session.user.userId;
    res.redirect(`/profile/${userId}`);
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