// Prototype setup listener for history state onready and onchange
hasher.initialized.add(parseHash); //parse initial hash
hasher.changed.add(parseHash); //parse hash changes
hasher.init(); //start listening for history change

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