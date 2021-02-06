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
        // Joins
        var appendDoc = await includeUnwind(doc.user_id, "_id", users);
        var mergedDoc = {...doc, ...appendDoc };
        doc = mergedDoc;

        // Modify Row
        doc.post_username = doc.username;
        delete doc.username;
        delete password;

        docs[i] = doc;
    };

    const helpersArr = [{
        name: "date",
        fxn: function(options) {
            const sqlDate = options;
            const humanDate = moment(sqlDate).format("MM/DD/YY")
            return humanDate;
        }
    }]

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

router.addRoute('goal-planner').matched.add(() => {
    // User must be logged in to view personal dashboard
    if (!req.session.loggedIn) {
        hasher.setHash("/login");
        return;
    }

    var genericData = {
        pageTitle: "Goal Planner",
        username: req.body.username
    }
    res.render("#goal-planner", genericData);
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