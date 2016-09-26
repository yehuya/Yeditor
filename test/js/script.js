function detect() {
    var selection = window.getSelection();
    if (selection.isCollapsed) return alert('Select some text');

    var range = selection.getRangeAt(0);

    var start = range.startContainer;
    var end = range.endContainer;
    var offset = { start: range.startOffset, end: range.endOffset }
    var sibling = {start: range.startContainer.nextSibling ,end: range.endContainer.previousSibling}

    process(start, end, sibling, offset, range);
    console.info('end process');
    console.log('sibling start', sibling.start);
    console.log('sibling end', sibling.end);
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
    } else {
        appendFromTo(start, offset.start, null);
        appendFromTo(end, null, offset.end);

        if (sibling.start == sibling.end) {
            append(sibling.start);
        } else {
            var next = sibling.start;

            while (next) {
                var b = false;
                var a = children(next, function (elem) {
                    append(elem);
                    console.log('children',elem);
                    if (elem == sibling.end) b = true;
                });

                if(!a){
                    console.log('no children');
                    var c = append(next);
                    // next = c;
                    // console.log('test', next, next.nextSibling);
                }else{
                    console.log('has children');
                }

                if (b || next == sibling.end) {
                    break;
                }

                console.log('current', next)
                next = next.nextSibling;
                console.log('end while - the next', next);
            }
        }
    }
}

// get all element - children
function children(node, callback) {
    var child = node.childNodes;
    if(child.length == 0) return false;

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
