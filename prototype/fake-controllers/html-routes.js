// Check dependencies
if (!Handlebars) alert("Error Dependencies: Load Handlebars before this routing js file");
if (!signals) alert("Error Dependencies: Load signals before this routing js file")
if (!window.res.render) alert("Error Dependencies: Load res.render.js before this routing js file")

// Set your website's name
var CONSTANT_SITE_TITLE = "Goals Social";

// Setup HTML routes
router.addRoute('/').matched.add(async() => {
    var docs = await posts.find().filter({}).toArray();
    console.log("Route Context: ", { docs });
    var postsWrapper = {
            posts: docs
        }
        // postsWrapper.pageTitle = global.CONSTANT_SITE_TITLE;
    postsWrapper.pageTitle = CONSTANT_SITE_TITLE;
    postsWrapper.username = req.session.username;
    console.log(postsWrapper);
    res.render("#world", postsWrapper);
});

router.addRoute('login').matched.add(() => {
    var genericData = {
        pageTitle: "Goals Social"
    }
    res.render("#login", genericData);
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

router.addRoute('signup').matched.add(() => {
    var genericData = {
        pageTitle: "Goals Social"
    }
    res.render("#signup", genericData);
});