var _CONTINUE;
var _END_CONTAINER;
var _HAS_CHILDREN;
var _BREAK_WHILE;

function testQA(FN) {
    var selection = window.getSelection();
    if (selection.isCollapsed) return alert('Select some text');

    var range = selection.getRangeAt(0);
    var data = rangeData(range, FN);

    process(data);
}

var testCloneRange = function(data, range){
    var content = range.extractContents();
    var span = document.createElement('span');
    span.style.fontWeight = 'bold';

    span.appendChild(content);
    range.insertNode(span);
}

/**
 * main process function
 */
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

// same element //1
function level1(data) {
    if (data.start == data.end) {
        appendFromTo(data.start, data.offset.start, data.offset.end, data.fn);
        console.log(level1.name, 1);
        _CONTINUE = false;
    }
}

// not the same element
// refreshSibling
function level2(data) {
    var startElement = appendFromTo(data.start, data.offset.start, null, data.fn);
    var endElement = appendFromTo(data.end, null, data.offset.end, data.fn);
    console.log(level2.name, 2);
    refreshSibling(data);

    if (endElement.parentElement && data.sibling.start == endElement.parentElement ||
        //startElement.parentElement && data.sibling.end == startElement.parentElement ||
        data.sibling.end == startElement) console.log(level2.name, 2.1), _CONTINUE = false;
}

// only 'one' element between end & start
function level3(data) {
    if (data.sibling.start == data.sibling.end && data.sibling.start != null) {
        console.log(level3.name, 3);

        var siblingStartChild = children(data.sibling.start, function (elem) {
            append(elem, data.fn);
            console.log(level3.name, 3.1, elem);
        });

        if (!siblingStartChild) console.log(level3.name, 3.2), append(data.sibling.start, data.fn);

        _CONTINUE = false;
    }
}

// get all the element between
function level4(data) {
    var next = data.sibling.start;
    var child, isTheEndContainer;
    console.log(level4.name, 4);

    _BREAK_WHILE = false;

    while (next) {

        _END_CONTAINER = false;
        _HAS_CHILDREN = false;

        // check if next have children
        level4_1(data, next);

        // ### no children
        next = level4_2(data, next);

        // ### break
        level4_3b(data, next);
        if (_BREAK_WHILE) break;

        level4_4b(data, next);
        if (_BREAK_WHILE) break;

        // ### next while
        next = preventEmptySibling(next.nextSibling) || next.nextElementSibling;
    }
}

function level4_1(data, next) {
    var child = children(next, function (elem) {
        if (!_END_CONTAINER) console.log(level4_1.name, 4.1, elem), append(elem, data.fn);
        if (elem == data.sibling.end) _END_CONTAINER = true;
    });

    return child ? _HAS_CHILDREN = true : _HAS_CHILDREN = false;
}

function level4_2(data, next) {
    //return !_HAS_CHILDREN && !_END_CONTAINER ? next = append(next, data.fn): next;
    if(!_HAS_CHILDREN && !_END_CONTAINER){
        console.log(level4_2.name, 4.2);
        return next = append(next, data.fn);
    }else{
        return next;
    }
}

function level4_3b(data, next) {
    if (data.sibling.end && next == data.sibling.end.toString()) {
        if (data.end.textContent.toString().substring(0, data.offset.end) == next.textContent) console.log(level4_3b.name, 4.3), _BREAK_WHILE = true;
    }
}

function level4_4b(data, next) {
    if (next == data.sibling.end || _END_CONTAINER) console.log(level4_4b.name, 4.4), _BREAK_WHILE = true;
}