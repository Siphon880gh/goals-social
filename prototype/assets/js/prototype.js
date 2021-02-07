// console warning that this is a prototype
document.addEventListener('DOMContentLoaded', () => {
    console.info("Prototype: Not meant for production. This is code done before refactoring into a full stack app. View source at index.php to see comments at top for more details on how the prototype works");
});

// fade out prototype visual cue
$(() => {
    setTimeout(() => {
        $(".prototype-php-engine").fadeOut(3000);
    }, 2000);
});

// @function showTable
// Can show all of any Zanko DB table. Is for debugging purposes, so call in browser console.
// Example: showTable(users, { _id: 1})
var showTable = (table, optionalWhere) => {
    (async function(table, optionalWhere) {
        return await table.find(optionalWhere ? optionalWhere : {}).toArray()
    })(table, optionalWhere)
    .then(dat => { console.log(dat); });
}

// Setup req and res
window.req = {}
window.req.body = {};
window.req.session = {};
window.req.session.user = {
    userId: null,
    username: null
}
window.res = {};
window.res.render = (querySelector, data, helpersArr, partialsArr) => {
    // Hide all other views and also destroy their old states
    $("[data-view]").addClass("d-none");
    $("[data-view] article").html("");
    // debugger;

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

/**
 * 
 * @function prototypeHooksLink
 * 
 * Prototype hooks to links
 * 
 * On frontend, we fake routes by taking over the default behavior of clicking a link
 * and then using Hasher to change the URL pathname without refreshing the page.
 * Crossroads JS' routing system picks up the URL pathname onchange then changes
 * the layout dynamically based on the URL pathname.
 * 
 */
function prototypeHooksLink(event) {
    event.preventDefault();
    var that = event.target;
    var link = that.getAttribute('href');
    hasher.setHash(link);
}

/**
 * 
 * ZangoDB does not do joins aka $lookup like MongoDB does
 * Here's are implementations
 */
async function includeA_assoc_B(context) {
    var {
        foreignKeyFromA,
        foreignTableB,
        foreignTarget,
        renameId
    } = context;

    // Get include row
    var lookup = {};
    lookup[foreignTarget] = foreignKeyFromA;
    // May return 1 or more objects in an array
    var appendDocs = await foreignTableB.find(lookup).toArray();

    if (renameId) {
        appendDocs.forEach(appendDoc => {
            appendDoc[renameId] = appendDoc._id;
            delete appendDoc._id;
        });
    }

    console.log({ appendDocs })

    return appendDocs;
}

/**
 * Setup browser JS and node JS interoperability
 */

// Crossroads JS and router will be interchangeable
window.router = crossroads;

// Node JS uses global, browser uses window
var global = window;