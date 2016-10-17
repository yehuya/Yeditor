function append(node, FN) {
    return appendFromTo(node, null, null, FN);
}

// @param Object (node)
// @return Object (the element with his parent - span);
function appendFromTo(node, from, to, FN) {
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

function createTextNode(text) {
    return document.createTextNode(text).cloneNode(true);
}

// prevent empty sibling 
// set theme as null
function preventEmptySibling(elem) {
    return (elem && elem.nodeType == 3 && elem.data && elem.data.trim().length == 0) ? null : elem;
}

// get all element - children
function children(node, callback) {
    var child = node.childNodes;
    child.forEach(function (element) {
        element.children ? children(element, callback) : callback(element);
    }, this);

    return child.length > 0 ? child : false;
}