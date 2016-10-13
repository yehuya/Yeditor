function detectQA(FN) {
    var selection = window.getSelection();
    if (selection.isCollapsed) return alert('Select some text');

    var range = selection.getRangeAt(0);
    var data = rangeData(range, FN);

    process(data);
}

function selection() {
    var s = window.getSelection();
    if (s.isCollapsed) return alert('Select some text');
    var range = s.getRangeAt(0);
    s.removeAllRanges();

    return range;
};

//############################ new

// get all the important param from selection range
// @param Object (range)
// @param FN (what to do...)
// @return Object
function rangeData(range, FN) {
    return {
        start: range.startContainer,
        end: range.endContainer,
        offset: {
            start: range.startOffset, 
            end: range.endOffset
        },
        sibling: { 
            start: range.startContainer.nextSibling, 
            end: range.endContainer.previousSibling 
        },
        range: range,
        fn: FN
    }
}

function refreshSibling(data) {
    if (data.sibling.start == null) data.sibling.start = preventEmptySibling(data.range.startContainer.nextSibling);
    if (data.sibling.end == null) data.sibling.end = preventEmptySibling(data.range.endContainer.previousSibling);
    return data;
}

// same element //1
function level1(data) {
    if (data.start == data.end) {
        appendFromTo(data.start, data.offset.start, data.offset.end, data.fn);
        console.log(1);
        _CONTINUE = false;
    }
}

// not the same element
// refreshSibling
function level2(data) {
    var startElement = appendFromTo(data.start, data.offset.start, null, data.fn);
    var endElement = appendFromTo(data.end, null, data.offset.end, data.fn);
    console.log(2);
    refreshSibling(data);

    if (data.sibling.end == startElement) console.log(2.1), _CONTINUE = false;
}

// only 'one' element between end & start
function level3(data) {
    if (data.sibling.start == data.sibling.end && data.sibling.start != null) {
        var siblingStartChild = children(data.sibling.start, function (elem) {
            append(elem, data.fn);
        });

        if (!siblingStartChild) append(data.sibling.start, data.fn);
        console.log(3);
        _CONTINUE = false;
    }
}

// get all the element between
function level4(data) {
    var next = data.sibling.start;
    var child, isTheEndContainer;
    console.log(4);
    while (next) {

        // ### children
        isTheEndContainer = false;
        child = children(next, function (elem) {
            if (!isTheEndContainer) append(elem, data.fn);
            if (elem == data.sibling.end) isTheEndContainer = true;
        });

        // ### no children
        if (!child && !isTheEndContainer) next = append(next, data.fn);

        // ### break
        if (next == data.sibling.end.toString()) {
            if (data.end.textContent.toString().substring(0, data.offset.end) == next.textContent) break;
        }
        if (next == data.sibling.end || isTheEndContainer) break;

        // ### next while
        next = next.nextSibling;
    }
}

var _CONTINUE;
function process(data) {
    _CONTINUE = true;

    // same element
    level1(data);
    if (!_CONTINUE) return;

    // not the same element
    // refresh sibling after the first appendFromTo fn
    // prevent junk sibling
    level2(data);
    if (!_CONTINUE) return;

    // only 'one' element between end & start
    level3(data);
    if (!_CONTINUE) return;

    // get all the element between
    level4(data);
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

