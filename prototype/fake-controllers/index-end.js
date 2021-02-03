// Prototype setup listener for history state onready and onchange
hasher.initialized.add(parseHash); //parse initial hash
hasher.changed.add(parseHash); //parse hash changes
hasher.init(); //start listening for history change

crossroads.bypassed.add(function(request) {
    console.log("Route not found. Debug info follows");
    console.log(request);
    debugger;
});

// For Hashers JS which detects and sets URL changes without refreshing the page,
// this is an on history state onready and onchange handler
function parseHash(newHash, oldHash) {

    // trigger crossroads to match for URLs
    crossroads.parse(newHash);
}