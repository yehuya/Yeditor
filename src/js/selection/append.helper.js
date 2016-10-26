"use strict";

/**
 * helper functions for parcess.helper.js 
 */

const exports = module.exports;

/**
 * helper fn for appendFromTo
 * insert all the element into new element (@from = null, @to = null)
 * @param Object (Node)
 * @param FN (append the element)
 * @return Object (Node)
 */
exports.append = function(node, FN) {
    return exports.appendFromTo(node, null, null, FN);
}

/**
 * append part from element into new element
 * @param Object (Node)
 * @param Number || Null (offset start, null = 0)
 * @param Number || Null (offset end, null = node.length)
 * @param FN (append the important part into new element - this happend in FN)
 * @return Object (the important part - Node)
 */
exports.appendFromTo = function(node, from, to, FN) {
    var text = node.textContent || '';
    var parent = node.parentElement || null;
    var nextSibling = node.nextSibling;

    if (to == null) to = text.length;
    if (from == null) from = 0;

    var before = text.substring(0, from);
    var main = text.substring(from, to);
    var after = text.substring(to, text.length);

    parent.removeChild(node);

    main = main.length > 0 ? FN(main) : null;

    if (before.length > 0) parent.insertBefore(createTextNode(before), nextSibling);
    if (main) parent.insertBefore(main, nextSibling);
    if (after.length > 0) parent.insertBefore(createTextNode(after), nextSibling);

    return main;
}

/**
 * create Text node
 * @param String 
 * @return Object (text node)
 */
function createTextNode(text) {
    return document.createTextNode(text).cloneNode(true);
}
