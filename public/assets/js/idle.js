// Warn user of inactivity after 1 min, log them out after 2 mins
idle({
    idle: 60000,
    onIdle: function() {
        let isLoggedInBasedOnDom = $("a[href='/logout']").length;
        if (isLoggedInBasedOnDom)
            alert("You will be logged out for inactivity after 1 minute.");
    }
}).start();

idle({
    idle: 120000,
    onIdle: function() {
        let isLoggedInBasedOnDom = $("a[href='/logout']").length;
        if (isLoggedInBasedOnDom) {
            alert("Logging out for inactivity...");
            document.location.pathname = "/logout";
        }
    }
}).start();