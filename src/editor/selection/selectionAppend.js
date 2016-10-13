const exports = module.exports;

/**
 * get user selection and insert it in new element
 * @param Object (window.getSelection())
 * @param FN (what to do with selected text)
 */
exports.append = function (selection, FN) {
    if (selection.isCollapsed) return;

    var range = selection.getRangeAt(0);
    var start = range.startContainer;
    var end = range.endContainer;
    var offset = { start: range.startOffset, end: range.endOffset }
    var sibling = { start: range.startContainer.nextSibling, end: range.endContainer.previousSibling }

    process(start, end, sibling, offset, range, FN);
}


function process(start, end, sibling, offset, range, FN) {
    var startElement, endElement;

    // same element
    if (start == end) return appendFromTo(start, offset.start, offset.end, FN);

    // not the same element
    startElement = appendFromTo(start, offset.start, null, FN);
    endElement = appendFromTo(end, null, offset.end, FN);

    // refresh sibling after the first appendFromTo fn
    // prevent junk sibling
    if (sibling.start == null) sibling.start = preventEmptySibling(range.startContainer.nextSibling);
    if (sibling.end == null) sibling.end = preventEmptySibling(range.endContainer.previousSibling);

    if (sibling.end == startElement) return;

    // only 'one' element between end & start
    if (sibling.start == sibling.end && sibling.start != null) {
        var siblingStartChild = children(sibling.start, function (elem) {
            append(elem, FN);
        });

        if (!siblingStartChild) append(sibling.start, FN);
        return;
    }


    getAllElementBetween(sibling, offset, end, FN);
}

// get all the element between
function getAllElementBetween(sibling, offset, end, FN) {
    var next = sibling.start;
    var child, isTheEndContainer;

    while (next) {

        // ### children
        isTheEndContainer = false;
        child = children(next, function (elem) {
            if (!isTheEndContainer) append(elem, FN);
            if (elem == sibling.end) isTheEndContainer = true;
        });

        // ### no children
        if (!child && !isTheEndContainer) next = append(next, FN);

        // ### break
        if (next == sibling.end.toString()) {
            if (end.textContent.toString().substring(0, offset.end) == next.textContent) break;
        }
        if (next == sibling.end || isTheEndContainer) break;

        // ### next while
        next = next.nextSibling;
    }
}

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
    return (elem.nodeType == 3 && elem.data && elem.data.trim().length == 0) ? null : elem;
}

// get all element - children
function children(node, callback) {
    var child = node.childNodes;
    child.forEach(function (element) {
        element.children ? children(element, callback) : callback(element);
    }, this);

    return child.length > 0 ? child : false;
}