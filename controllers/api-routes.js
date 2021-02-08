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

    // Redirection is handled by ajax
    res.status(200).json({ success: "Updated profile bio and avatar" });
}); // PUT /users

// Add comment
router.post('/posts/:postId/comments', async(req, res) => {
    postId = parseInt(req.params.postId);
    var userId = req.session.user.userId;
    // console.assert(postId === 2, postId);
    // console.assert(userId === 1, userId);

    // Retrofit for Db
    req.body.post_id = postId;
    req.body.user_id = userId;

    // console.log(JSON.stringify(req.body));
    // process.exit(0);

    Comments.create(req.body);

    // Redirection is handled by ajax
    res.status(200).json({ success: "Created comment" });
});

// Login information
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

/** Delete milestone */
router.delete('/milestones/:milestoneId', async(req, res) => {
    milestoneId = parseInt(req.params.milestoneId);
    var statusDeleteMilestone = Milestones.destroy({ where: { id: milestoneId } });

    // Redirection is handled by ajax
    res.status(200).json({ success: "Deleted milestone" });
});

/** Delete goal post */
router.delete('/posts/:postId', async(req, res) => {
    postId = parseInt(req.params.postId);
    var statusRemovePost = Posts.destroy({ where: { id: postId } });

    // Redirection is handled by ajax
    res.status(200).json({ success: "Deleted goal post" });
});

/**
 * Update post and its milestones from goal planner
 */
router.patch('/posts/:postId', async(req, res) => {
    var postId = req.params.postId;
    var {
        goal,
        detail,
        start,
        end,
        id,
        milestones,
    } = req.body;

    // Retrofit for DB
    delete req.body.milestones;
    var postId = id;
    delete _id;
    req.body.user_id = req.session.user.userId;

    // Update post (milestones will be updated on its own table)
    var statusPostsUpdate = await Posts.update(req.body, { where: { id: postId } });

    // Differentiate old milestones that may need updating vs new milestones that need inserting
    // console.log(JSON.stringify(milestones));
    // process.exit(0);
    var oldMilestones = milestones.filter(milestone => milestone.milestoneId);
    var newMilestones = milestones.filter(milestone => !milestone.milestoneId);
    oldMilestones = oldMilestones.map(milestone => {
        return {
            id: milestone.milestoneId,
            milestone: milestone.milestoneName,
            detail: milestone.milestoneDetail,
            post_id: postId,
            done: milestone.done
        };
    });
    newMilestones = newMilestones.map(milestone => {
        return {
            milestone: milestone.milestoneName,
            detail: milestone.milestoneDetail,
            post_id: postId,
            done: milestone.done
        };
    });

    if (oldMilestones) {
        oldMilestones.forEach(async(oldMilestone) => {
            var statusOldMilestonesUpdate = await Milestones.update(oldMilestone, { where: { id: oldMilestone.id } });
        });
    }
    if (newMilestones) {
        var statusNewMilestonesUpdate = await Milestones.bulkCreate(newMilestones);
    }

    // Redirection is handled by ajax
    res.status(200).json({ success: "Updated goal post and its milestones" });
}); // PATCH /posts/:postId


/**
 * Create post and its milestones from goal planner
 * Ids etc are mostly left intact from patching post to keep code scalable
 */
router.post('/posts', async(req, res) => {
    var {
        goal,
        detail,
        start,
        end,
        id,
        milestones,
    } = req.body;

    // Retrofit for DB
    delete req.body.milestones;
    delete req.body._id;
    req.body.user_id = req.session.user.userId;

    // Create post (milestones will be updated on its own table)
    var statusCreatePost = await Posts.create(req.body);

    // console.log(JSON.stringify(statusCreatePost));
    // process.exit(0);

    if (!statusCreatePost) {
        res.status(500).json({ success: 0, error: "Please contact web developer. Unable to create post due to a server error." });
        return;
    }

    // Get last inserted post ID
    var postId = statusCreatePost.id;

    var newMilestones = milestones;
    newMilestones = newMilestones.map(milestone => {
        return {
            milestone: milestone.milestoneName,
            detail: milestone.milestoneDetail,
            post_id: postId,
            done: milestone.done
        };
    });

    if (newMilestones) {
        var statusInsertedMilestone = Milestones.bulkCreate(newMilestones);
    }

    // Redirection is handled by ajax
    res.status(200).json({ success: "Created goal post and any of its milestones" });
}); // POST /posts

module.exports = router;