// Warn user of inactivity after 3 min, log them out after 5 mins
idle({
    idle: 60000 * 3,
    onIdle: function() {
        let isLoggedInBasedOnDom = $("a[href='/logout']").length;
        if (isLoggedInBasedOnDom)
            alert("You will be logged out for inactivity after 2 minutes.");
    }
}).start();

idle({
    idle: 60000 * 5,
    onIdle: function() {
        let isLoggedInBasedOnDom = $("a[href='/logout']").length;
        if (isLoggedInBasedOnDom) {
            alert("Logging out for inactivity...");
            document.location.pathname = "/logout";
        }
    }
}).start();