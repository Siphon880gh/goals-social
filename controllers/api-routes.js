const router = require('express').Router();
const bcrypt = require('bcrypt');
const {
    User,
    Posts,
    Comments,
    Milestones,
    UserInfos
} = require('../models');
// const Chatroom = require('../models/Chatroom');
// const chatroomRoutes = require('./api/chatroom-routes.js')


// Update user extra info
router.put('/users', async(req, res) => {
    // Only logged in users
    if (!req.session.loggedIn)
        res.redirect('/login');

    userId = parseInt(req.session.user.userId);
    // console.assert(userId === 1, userId);

    // Retrofit for Db
    req.body.uid = userId;

    // console.log(JSON.stringify({ a: userId }));
    // process.exit(0);
    // Upsert userInfos. userInfos table does not identify with _id column but by _uid column
    var userInfoDbStatus = await UserInfos.upsert(req.body, { where: { uid: userId } });

    // If user is also changing avatar:
    if (req.body.chosenAvatarName) {
        User.update({ avatar: req.body.chosenAvatarName }, { where: { id: userId } });
    }

    res.status(200).json({ success: "Updated profile bio and avatar" });
    // Redirection is handled by ajax
    // res.redirect("/profile");
});

router.post('/login', async(req, res) => {
    // User logging in
    // TODO: User logging in

    const { username, password } = req.body;

    let row = await User.findOne({
        where: {
            username
        }
    }).then(async(row) => {
        if (row) row = row.get({ plain: true });

        // console.log(row)
        // process.exit(0);

        const plainPassword = password;
        const hash = row.password;
        let passwordMatch = bcrypt.compareSync(plainPassword, hash);

        if (passwordMatch) return row;
        else return null;
    }).catch(err => {
        console.log({ err });
        return;
    });

    if (row) {
        const dbUserData = row;

        req.session.loggedIn = 1;
        req.session.user = {
            userId: dbUserData.id,
            username: dbUserData.username
        };

        res.json({ loggedIn: 1 });
    } else {
        res.json({ loggedIn: 0 });
    }
});

router.post('/signup', async(req, res) => {
    // If user logged in, log user out
    if (req.session.loggedIn) {
        req.session.destroy(() => {});
    }
    const { username, password } = req.body;

    let userCreated = await User.create({
        username,
        password
    }).then(async(row) => {
        if (row) row = row.get({ plain: true });

        // Password is removed
        delete row.password;

        return row;
    }).catch(err => {
        console.log({ err });
        res.status(500).json({ loggedIn: 0, error: "General catch-all error: Most likely this username is taken already." });
        return;
    });

    if (userCreated) {
        // Start session:
        // console.log({ userCreated });

        req.session.loggedIn = 1;
        req.session.user = {
            userId: userCreated.id,
            username: userCreated.username
        };

        res.status(200).json({ loggedIn: 1, userCreated });
    } else {
        res.json({ loggedIn: 0, error: "General catch-all error: Most likely this username is taken already." });
    }

});

router.get('/logout', (req, res) => {
    // User logging out
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            // res.status(204).json({ loggedIn: 0 });
            res.status(204).redirect("../login");
        });
    } else {
        // res.status(404).json({ loggedIn: 0 });
        res.status(404).redirect("../login");
    }
});

module.exports = router;