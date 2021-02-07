// Check dependencies
if (!Handlebars) alert("Error Dependencies: Load Handlebars before this routing js file");
if (!signals) alert("Error Dependencies: Load signals before this routing js file")
if (!window.res.render) alert("Error Dependencies: Load res.render.js before this routing js file")

// Set your website's name
global.CONSTANT_SITE_TITLE = "Goals Social";

// Setup API routes
router.addRoute('api-post/login').matched.add(async() => {
    // Any user is logged out
    window.req.session.loggedIn = 0;
    window.req.session.user.userId = null;
    window.req.session.user.username = null;

    const { username, password } = window.req.body;
    const myPlainPassword = password;

    let users = window.users;

    let foundUser = await users.findOne({
        username: { $eq: username },
    });

    let hashedPassword = foundUser && foundUser.password ? foundUser.password : null;
    let userId = foundUser && foundUser._id ? foundUser._id : null;

    function failed() {
        window.req.session.loggedIn = 0;
        hasher.setHash("/login");
    }
    if (hashedPassword) {
        var matchedPassword = bcrypt.compareSync(myPlainPassword, hashedPassword);
        if (!matchedPassword) {
            failed();
            return;
        }
    } else {
        failed();
        return;
    }

    window.req.session.loggedIn = 1;
    window.req.session.user.userId = userId;
    window.req.session.user.username = username;
    hasher.setHash("/dashboard");
});

router.addRoute('api/logout').matched.add(async() => {
    window.req.session.loggedIn = false;
    hasher.setHash("/");
});

/** Delete milestone */
router.addRoute('delete-api/milestones/{milestoneId}').matched.add(async(milestoneId) => {
    // debugger;
    milestoneId = parseInt(milestoneId);
    window.milestones.remove({ _id: milestoneId }, (error) => {
        if (error) { throw error; }
    });

    // No need to redirect. The milestone DOM will delete on frontend.
});

/** Delete goal post */
router.addRoute('delete-api/posts/{postId}').matched.add(async(postId) => {
    // debugger;
    postId = parseInt(postId);
    window.posts.remove({ _id: postId }, (error) => {
        if (error) { throw error; }
    });

    // Go to own profile
    hasher.setHash("profile/");
});

/**
 * Update post and its milestones from goal planner
 */
router.addRoute('patch-api/posts/{postId}').matched.add(async() => {
    var {
        goal,
        detail,
        start,
        end,
        _id,
        milestones,
    } = window.req.body;

    // Sanitize for DB
    delete req.body.milestones;
    var postId = _id;
    delete _id;
    req.body.user_id = window.req.session.user.userId;

    // Update post (milestones will be updated on its own table)
    window.posts.update({ _id: postId }, req.body);

    // Differentiate old milestones that may need updating vs new milestones that need inserting
    var oldMilestones = milestones.filter(milestone => milestone.milestoneId);
    var newMilestones = milestones.filter(milestone => !milestone.milestoneId);
    oldMilestones = oldMilestones.map(milestone => {
        return {
            _id: milestone.milestoneId,
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
        oldMilestones.forEach(oldMilestone => {
            window.milestones.update({ _id: oldMilestone._id }, oldMilestone, (error) => {
                if (error) { throw error; }
            });
        });
    }
    if (newMilestones) {
        window.milestones.insert(newMilestones, (error) => {
            if (error) { throw error; }
        });
    }

    // Go to own profile
    hasher.setHash("profile/");
});


/**
 * Create post and its milestones from goal planner
 * Ids etc are mostly left intact from patching post to keep code scalable
 */
router.addRoute('post-api/posts/').matched.add(async() => {
    var {
        goal,
        detail,
        start,
        end,
        _id,
        milestones,
    } = window.req.body;

    // Sanitize for DB
    delete req.body.milestones;
    delete req.body._id;
    req.body.user_id = window.req.session.user.userId;

    // Create post (milestones will be updated on its own table)
    await window.posts.insert(req.body);

    // Get last inserted post ID
    var lastPostIdBundle = await window.posts.find().sort({ _id: -1 }).toArray();
    var postId = lastPostIdBundle[0]._id;

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
        window.milestones.insert(newMilestones, (error) => {
            if (error) { throw error; }
        });
    }

    // Go to own profile
    hasher.setHash("profile/");
});