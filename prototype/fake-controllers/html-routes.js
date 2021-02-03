// Check dependencies
if (!Handlebars) alert("Error Dependencies: Load Handlebars before routes.js");
if (!signals) alert("Error Dependencies: Load signals before routes.js")
if (!window.res.render) alert("Error Dependencies: Load res.render.js before routes.js")

// Setup routes
crossroads.addRoute('/')
    .matched.add(() => {
        hasher.setHash('login');
    }); // matched

crossroads.addRoute('login')
    .matched.add(() => {
        var genericData = {
            pageTitle: "Goals Social"
        }
        res.render("#login", genericData);
    });

crossroads.addRoute('signup')
    .matched.add(() => {
        var genericData = {
            pageTitle: "Goals Social"
        }
        res.render("#signup", genericData);
    });

crossroads.addRoute('logout')
    .matched.add(() => {
        alert("Prototype: Would be logging out.");
    });


crossroads.bypassed.add(function(request) {
    console.log("Route not found. Debug info follows");
    console.log(request);
    debugger;
});

// parseHash is an handler for on history state onready and onchange
function parseHash(newHash, oldHash) {
    // crossroads parse triggers crossroads matched.add
    crossroads.parse(newHash);

    // Update the page title
    setTimeout(() => {

        const $visibleView = $("[data-view]:not(.d-none");
        const newPageTitle = $visibleView.find(".page-title-dynamic").text();
        $(".page-title").text(newPageTitle);
    }, 200);
}

// setup listener for history state onready and onchange
hasher.initialized.add(parseHash); //parse initial hash
hasher.changed.add(parseHash); //parse hash changes
hasher.init(); //start listening for history change