// Check dependencies
if (!Handlebars) alert("Error Dependencies: Load Handlebars before this routing js file");
if (!signals) alert("Error Dependencies: Load signals before this routing js file")
if (!window.res.render) alert("Error Dependencies: Load res.render.js before this routing js file")

// Set your website's name
var CONSTANT_SITE_TITLE = "Goals Social";

// Setup HTML routes

// World posts
router.addRoute('/').matched.add(async() => {
    var docs = await posts.find().toArray();

    for (var i = 0; i < docs.length; i++) {
        var doc = docs[i];
        var post = doc;
        // Join and unwind (params A, B)
        // A=Posts, B=Users
        var appendDoc = await includeA_assoc_B({
            foreignKeyFromA: post.user_id,
            foreignTableB: users,
            foreignTarget: "_id"
        });

        // Then unwind
        if (appendDoc.length) {
            appendDoc = appendDoc[0];
            delete appendDoc._id;
            var mergedDoc = {...doc, ...appendDoc };
            doc = mergedDoc;
        }

        // Modify Row
        doc.post_username = doc.username;
        delete doc.username;
        delete password;

        // Join as array (params A, B)
        // A=Milestones, B=Posts
        var milestonesData = await includeA_assoc_B({
            foreignKeyFromA: post._id,
            foreignTableB: milestones,
            foreignTarget: "post_id",
            renameId: "milestone_id"
        });
        // A=Comments, B=Posts
        var commentsData = await includeA_assoc_B({
            foreignKeyFromA: post._id,
            foreignTableB: comments,
            foreignTarget: "post_id",
            renameId: "comment_id"
        });

        // Modify Row
        doc.milestones = milestonesData;

        // Each comments will have avatar and username of comment owner
        for (var j = 0; j < commentsData.length; j++) {
            var comment = commentsData[j];
            console.log({ "commentUserId": comment.user_id })

            // Join and unwind (params A, B)
            // A=Comment ID, B=Users
            var commentUserInfo = await includeA_assoc_B({
                foreignKeyFromA: comment.user_id,
                foreignTableB: users,
                foreignTarget: "_id"
            });
            commentUserInfo = commentUserInfo[0];
            comment.username = commentUserInfo.username;
            comment.avatar = commentUserInfo.avatar;

            // Mock
            // comment.username = "Fake username";
            // comment.avatar = "Fake avatar";

            commentsData[j] = comment;
        };

        doc.comments = commentsData;


        // debugger;

        docs[i] = doc;
    };
    // debugger;

    const helpersArr = [{
        name: "date",
        fxn: function(options) {
            const sqlDate = options;
            const humanDate = moment(sqlDate).format("MM/DD/YY")
            return humanDate;
        }
    }];

    // console.log({ docs });
    // debugger;

    console.log("Route Context: ", { docs });
    var postsWrapper = {
            posts: docs
        }
        // postsWrapper.pageTitle = global.CONSTANT_SITE_TITLE;
    postsWrapper.pageTitle = CONSTANT_SITE_TITLE;
    postsWrapper.username = req.session.username;
    console.log(postsWrapper);
    res.render("#world", postsWrapper, helpersArr);
});

router.addRoute('login').matched.add(() => {
    var genericData = {
        pageTitle: "Goals Social"
    }
    res.render("#login", genericData);
});

router.addRoute('chatroom').matched.add(() => {
    // User must be logged in to view personal dashboard
    if (!req.session.loggedIn) {
        hasher.setHash("/login");
        return;
    }

    var genericData = {
        pageTitle: "World Chat",
        username: req.body.username
    }
    res.render("#chatroom", genericData);
});

router.addRoute('dashboard').matched.add(() => {
    // User must be logged in to view personal dashboard
    if (!req.session.loggedIn) {
        hasher.setHash("/login");
        return;
    }

    var genericData = {
        pageTitle: "Your Details",
        username: req.body.username
    }
    res.render("#dashboard", genericData);
});

router.addRoute('edit-profile').matched.add(() => {
    // User must be logged in to view personal dashboard
    if (!req.session.loggedIn) {
        hasher.setHash("/login");
        return;
    }

    var genericData = {
        pageTitle: "Edit Profile",
        username: req.body.username
    }
    res.render("#edit-profile", genericData);
});

router.addRoute('goal-planner').matched.add(async() => {
    // User must be logged in to view personal dashboard
    if (!req.session.loggedIn) {
        hasher.setHash("/login");
        return;
    }

    // console.assert(req.session.loggedIn === 1);
    // console.assert(req.session.user.userId === 1);

    var pdocs = await posts.find({ user_id: req.session.user.userId }).toArray();

    // Joining each post with milestones
    for (var i = 0; i < pdocs.length; i++) {
        var post = pdocs[i];
        var postId = post._id;

        // Join as array (params A, B)
        // A=Milestones, B=Posts
        var milestonesData = await includeA_assoc_B({
            foreignKeyFromA: postId,
            foreignTableB: milestones,
            foreignTarget: "post_id",
            renameId: "milestone_id"
        });
        post.milestones = milestonesData;
        pdocs[i] = post;
        if (i === 0) {
            console.assert(post.milestones.length == 2, post.milestones);
        }
    }


    // console.assert(pdocs.length === 4, pdocs.length)
    pdocs.push({}); // there's always a blank goal at the end to add

    var postsWrapper = {
        pageTitle: "Goal Planner",
        username: req.body.username,
        posts: pdocs
    }

    const helpersArr = [{
        name: "datepickerFormat",
        fxn: function(options) {
            const sqlDate = options;
            const humanDate = moment(sqlDate).format("YYYY-MM-DD")
            return humanDate;
        }
    }];

    res.render("#goal-planner", postsWrapper, helpersArr);
});

router.addRoute('profile').matched.add(() => {
    // User must be logged in to view personal dashboard
    if (!req.session.loggedIn) {
        hasher.setHash("/login");
        return;
    }

    var genericData = {
        pageTitle: "Your Details",
        username: req.body.username
    }
    res.render("#profile", genericData);
});

router.addRoute('signup').matched.add(() => {
    var genericData = {
        pageTitle: "Goals Social"
    }
    res.render("#signup", genericData);
});