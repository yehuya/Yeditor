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
    if (data.sibling.start == null) data.sibling.start = preventEmptySibling(data.range.startContainer.nextSibling) || data.range.startContainer.nextElementSibling;
    if (data.sibling.end == null) data.sibling.end = preventEmptySibling(data.range.endContainer.previousSibling) || data.range.endContainer.previousElementSibling;
    console.log(refreshSibling.name, data);
    
    return data;
}

function selection() {
    var s = window.getSelection();
    if (s.isCollapsed) return alert('Select some text');
    var range = s.getRangeAt(0);
    s.removeAllRanges();

    return range;
};

function bold(text){
    var b = document.createElement('span');
    b.style.fontWeight = 'bold';

    var c = createTextNode(text);

    b.appendChild(c);
    return b.cloneNode(true);
}

function underline(text){
    var u = document.createElement('span');
    u.style.textDecoration = 'underline';

    var c = createTextNode(text);

    u.appendChild(c);
    return u.cloneNode(true);
}