function detect() {
    var selection = window.getSelection();
    if (selection.isCollapsed) return alert('Select some text');

    var range = selection.getRangeAt(0);

    var start = range.startContainer;
    var end = range.endContainer;
    var offset = { start: range.startOffset, end: range.endOffset }
    var sibling = { start: range.startContainer.nextSibling, end: range.endContainer.previousSibling }

    process(start, end, sibling, offset, range);

    selection.removeAllRanges();
}

function selection() {
    var s = window.getSelection();
    if (s.isCollapsed) return alert('Select some text');
    var range = s.getRangeAt(0);
    s.removeAllRanges();

    return range;
}

function process(start, end, sibling, offset, range) {
    if (start == end) {
        appendFromTo(start, offset.start, offset.end);
        console.log(0);
        if (sibling.start == sibling.end) {
            console.log(1);
        } else {
            console.log(2);
        }
    } else {
        appendFromTo(start, offset.start, null);
        appendFromTo(end, null, offset.end);

        console.log(3);

        if (sibling.start == sibling.end) {
            append(sibling.start);
        } else {
            var next = sibling.start;
            console.log(5);
            while (next) {
                console.log(6);
                var b = false;
                var c = false;
                var a = children(next, function (elem) {
                    console.log(7);
                    append(elem);
                    if (elem == end) b = true;
                });

                if (!a) {
                    c = append(next);
                    console.log(8);
                }

                if (b || next == sibling.end || c == sibling.end) {
                    
                    break;
                }

                if(c){
                    console.log(c, c.nextSibling);
                    next = c.nextSibling;
                }else{
                    next = next.nextSibling;
                }
            }
        }
    }
}

// get all element - children
function children(node, callback) {
    var child = node.childNodes;
    console.log(node,child);
    if (child.length == 0) return false;

    for (var i = 0; i < child.length; i++) {
        if (child[i].children) {
            callback(child[i]);
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
    var text = node.textContent;
    var parent = node.parentElement;
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
