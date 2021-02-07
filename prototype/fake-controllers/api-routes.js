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


router.addRoute('patch-api/posts/{postId}').matched.add(async() => {
    var {
        goal,
        detail,
        start,
        end,
        id,
        milestones
    } = window.req.body;

    var postId = id;
    delete id;

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
    hasher.setHash("/");

});