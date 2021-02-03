// Check dependencies
if (!Handlebars) alert("Error Dependencies: Load Handlebars before this routing js file");
if (!signals) alert("Error Dependencies: Load signals before this routing js file")
if (!window.res.render) alert("Error Dependencies: Load res.render.js before this routing js file")

// Setup HTML routes
router.addRoute('/').matched.add(() => {
    hasher.setHash('login');
});

router.addRoute('login').matched.add(() => {
    var genericData = {
        pageTitle: "Goals Social"
    }
    res.render("#login", genericData);
});

router.addRoute('signup').matched.add(() => {
    var genericData = {
        pageTitle: "Goals Social"
    }
    res.render("#signup", genericData);
});

router.addRoute('logout').matched.add(() => {
    alert("Prototype: Would be logging out.");
});