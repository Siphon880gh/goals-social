// setup renderer
window.res = {
    render: (querySelector, data, helpersArr, partialsArr) => {
        // Hide all other views
        $("[data-view]").addClass("d-none");

        // Register helpers
        // Render view at id=querySelector
        const hbs = Handlebars.create();
        if (helpersArr)
            helpersArr.forEach(helper => {
                hbs.registerHelper(helper.name, helper.fxn);
            });
        var template = $(querySelector + " template").clone().html().trim();
        var pTemplate = hbs.compile(template);
        var html = pTemplate(data);
        $(querySelector + " article").html(html);

        // Unhide view with id=querySelector
        $(querySelector).removeClass("d-none");
    }
};