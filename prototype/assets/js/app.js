document.addEventListener('DOMContentLoaded', () => {

    console.info("Prototype: Not meant for production. This is a prototype to help the developer divide html into templates, to come up with routes for the app's features, and to figure out the JS logic and CSS. Mock data is being used. The Handlebars in this prototype is similar to Express-Handlebars but is a frontend version.");


    console.info("\nView all the webpage and API routes with: " + `$('[data-route]').map((i, el) => { return { ele: el, next: $(el).data("route") } });`);


    console.info("\nShould you want to show all webpages at once, click thru all possible renderings, then run: " + `$("[data-view]").removeClass("d-none");`)
});