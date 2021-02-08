/**
 * 
 * @function getClosestDateAttribute
 * Great for when you associate a DOM with other database values by placing them 
 * inside attributes because the user does not need to see thoes values..
 * 
 * Example is when you have a button to change a social media post but you need to get the post ID: 
 * <button onclick="getClosestDataAttribute($(event.target), 'post-id');">Test data attributes</button>
 * 
 * Then it'll go up the tree if the current DOM does not have data-${datasetName} attribute until some 
 * ancestral DOM has the data-${datasetName} attribute, then returns that attribute's value
 * 
 * @params {$here} jQuery query selected DOM. Only uses one DOM so do not provide multiple DOM's
 * @datasetName {string} The part that makes up the attribute data-${datasetName}. So do not 
 * precede argument with "data-"
 * 
 * @return {Mixed} value of attribute at the $here or some ancestral DOM from $here. 
 * Attribute is data-${datasetName}
 * 
 */
function getClosestDataAttribute($here, datasetName) {
    if (typeof $here.data(datasetName) === "undefined") {
        $here = $here.closest(`[data-${datasetName}]`)
    }
    const datasetValue = $here.data(datasetName);
    // debugger;
    return datasetValue;
}

/**
 * 
 * @function prototypeHooksLink
 * 
 * Obsolete "Prototype" no longer hooks to links
 * 
 * When copying code over from Prototype to Production, make onclick="prototypeHooksLink(event)"
 * an inactive function, so don't have to refactor every single link
 * 
 */
function prototypeHooksLink(event) {}