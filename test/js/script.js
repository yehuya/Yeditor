function detect() {
    var selection = window.getSelection();
    if (selection.isCollapsed) return alert('Select some text');

    var range = selection.getRangeAt(0);
    window.r = range;
    var start = range.startContainer;
    var end = range.endContainer;
    var offset = { start: range.startOffset, end: range.endOffset }
    var sibling = { start: range.startContainer.nextSibling, end: range.endContainer.previousSibling }
    console.log(sibling);
    process2(start, end, sibling, offset, range);
}

function selection() {
    var s = window.getSelection();
    if (s.isCollapsed) return alert('Select some text');
    var range = s.getRangeAt(0);
    s.removeAllRanges();

    return range;
};

function process2(start, end, sibling, offset, range) {
    var startElement, endElement;

    // same element
    if (start == end) {
        console.log('1');
        return appendFromTo(start, offset.start, offset.end);

        // not the same element
    } else {
        startElement = appendFromTo(start, offset.start, null);
        endElement = appendFromTo(end, null, offset.end);
        console.log('2');
    }

    // refresh sibling after the first appendFromTo fn
    // prevent junk sibling
    if (sibling.start == null) sibling.start = preventEmptySibling(range.startContainer.nextSibling);
    if (sibling.end == null) sibling.end = preventEmptySibling(range.endContainer.previousSibling);

    if (sibling.end == startElement) {
        console.log('2.1');
        return;
    }

    // only 'one' element between end & start
    if (sibling.start == sibling.end && sibling.start != null) {
        console.log('3', sibling.start);

        var siblingStartChild = children(sibling.start, function (elem) {
            append(elem);
            console.log('3.1');
        });

        if(!siblingStartChild) append(sibling.start) ,console.log('3.2');
        return;
    }

    // get all the element between
    var next = sibling.start;
    var a, b, c;

    while (next) {
        console.log('4', next);

        // ### children
        b = false;
        a = children(next, function (elem) {
            if (!b) append(elem);
            if (elem == sibling.end) b = true;
            console.log('4.1', elem, b);
        });

        // ### no children
        if (!a && !b) {
            console.log('4.2', next);
            next = append(next);
        }

        // ### break
        if (next == end.toString()) {
            console.log('4.3.0');
        }

        if (next == sibling.end.toString()) {
            console.log('4.3.0.1');
            if (end.textContent.toString().substring(0, offset.end) == next.textContent) break;
            console.log('4.3.0.1.0')
        }

        // child equal to sibling.end
        if (b) {
            console.log('4.3.1');
            break;
        }

        if (next == sibling.end) {
            console.log('4.3.2');
            break;
        }

        // ### next while
        next = next.nextSibling;
        if (next == null) {
            console.log('just end');
        }
    }
}

function process(start, end, sibling, offset, range) {
    if (start == end) {
        console.log(1);
        appendFromTo(start, offset.start, offset.end);
    } else {
        console.log(2);
        appendFromTo(start, offset.start, null);
        appendFromTo(end, null, offset.end);

        if (sibling.start == sibling.end) {
            append(sibling.start);
            console.log(3);

        } else {
            var next = sibling.start;
            console.log(4);

            while (next) {
                var b = false;
                var a = children(next, function (elem) {
                    append(elem);
                    console.log(5);
                    if (elem == sibling.end) b = true;
                });

                if (!a) {
                    var c = append(next);
                    console.log(6);
                }

                if (b || next == sibling.end) {
                    console.log(7);
                    break;
                }

                next = next.nextSibling;
            }
        }
    }
}

// get all element - children
function children(node, callback) {
    var child = node.childNodes;
    console.log('---',node, child);
    if (child.length == 0) return false;

    for (var i = 0; i < child.length; i++) {
        if (child[i].children) {
            // callback(child[i]);
            children(child[i], callback);
        } else {
            callback(child[i]);
        }
    }
    return true;
}

function append(node) {
    return appendFromTo(node, null, null);
}

// @param Object (node)
// @return Object (the element with his parent - span);
function appendFromTo(node, from, to) {
    var text = node.textContent || '';
    var parent = node.parentElement || null;
    var nextSibling = node.nextSibling;

    if (to == null) to = text.length;
    if (from == null) from = 0;

    var p1 = text.substring(0, from);
    var p2 = text.substring(from, to);
    var p3 = text.substring(to, text.length);

    parent.removeChild(node);

    var mainText = p2.length > 0 ? appendTextToSpan(p2) : null;

    if (p1.length > 0) parent.insertBefore(createTextNode(p1), nextSibling);
    if (p2.length > 0) parent.insertBefore(mainText, nextSibling);
    if (p3.length > 0) parent.insertBefore(createTextNode(p3), nextSibling);

    return mainText;
}

function createTextNode(text) {
    return document.createTextNode(text).cloneNode(true);
}

function appendTextToSpan(text) {
    var span = document.createElement('span');
    span.style.fontWeight = 'bold';

    var textNode = createTextNode(text);
    span.appendChild(textNode);

    return span.cloneNode(true)
}

// prevent empty sibling 
// set theme as null
function preventEmptySibling(elem) {
    if (elem.nodeType == 3 && elem.data && elem.data.trim().length == 0) {
        return null;
    }
    return elem;
}