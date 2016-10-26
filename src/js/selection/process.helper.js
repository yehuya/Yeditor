"use strict";

/**
 * helper functions for user selection append in Selection.class.js
 */

/**
 * import helper function for the process
 */
import { append, appendFromTo } from './append.helper.js';

const exports = module.exports;

/**
 * important vars for the process flow
 */
var _CONTINUE;
var _END_CONTAINER;
var _HAS_CHILDREN;
var _BREAK_WHILE;

/**
 * the main process function
 * get the user selection and append it into new element
 * @param Object (user selection)
 * @param FN (what to do with the selection)
 */
exports.process = function(range, FN) {
    var data = rangeData(range, FN)
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

/**
 * same element
 * @param Object (range data)
 */ 
function level1(data) {
    if (data.start == data.end) {
        appendFromTo(data.start, data.offset.start, data.offset.end, data.fn);
        _CONTINUE = false;
    }
}

/*
 * not the same element
 * refreshSibling
 * @param Object (range data)
 */
function level2(data) {
    var startElement = appendFromTo(data.start, data.offset.start, null, data.fn);
    var endElement = appendFromTo(data.end, null, data.offset.end, data.fn);

    refreshSibling(data);

    if (endElement.parentElement && data.sibling.start == endElement.parentElement ||
        data.sibling.end == startElement) _CONTINUE = false;
}

/*
 * only 'one' element between end & start
 * @param Object (range data)
 */
function level3(data) {
    if (data.sibling.start == data.sibling.end && data.sibling.start != null) {
  
        var siblingStartChild = children(data.sibling.start, function (elem) {
            append(elem, data.fn);
        });

        if (!siblingStartChild) append(data.sibling.start, data.fn);

        _CONTINUE = false;
    }
}

/*
 * get all the element between
 * @param Object (range data)
 */
function level4(data) {
    var next = data.sibling.start;
    var child, isTheEndContainer;

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

/**
 * while: children
 * @param Object (range data)
 * @param Object (Node element)
 */
function level4_1(data, next) {
    var child = children(next, function (elem) {
        if (!_END_CONTAINER) append(elem, data.fn);
        if (elem == data.sibling.end) _END_CONTAINER = true;
    });

    return child ? _HAS_CHILDREN = true : _HAS_CHILDREN = false;
}

/**
 * while: no-children
 * @param Object (range data)
 * @param Object (Node element)
 * @return Object (Node element)
 */
function level4_2(data, next) {
    return !_HAS_CHILDREN && !_END_CONTAINER ? next = append(next, data.fn): next;
}

/**
 * while: break
 * @param Object (range data)
 * @param Object (Node element)
 */
function level4_3b(data, next) {
    if (data.sibling.end && next == data.sibling.end.toString()) {
        if (data.end.textContent.toString().substring(0, data.offset.end) == next.textContent) _BREAK_WHILE = true;
    }
}

/**
 * while: break
 * @param Object (range data)
 * @param Object (Node element)
 */
function level4_4b(data, next) {
    if (next == data.sibling.end || _END_CONTAINER) _BREAK_WHILE = true;
}

/**
 * order the range (user selection) object for the process function
 * @param Object (range)
 * @param FN (what to do with the selection)
 * @return Object
 */
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

/**
 * refresh range sibling after the first appendFromTo fn 
 * @param Object (range data)
 * @return Object (range data)
 */
function refreshSibling(data) {
    if (data.sibling.start == null) data.sibling.start = preventEmptySibling(data.range.startContainer.nextSibling) || data.range.startContainer.nextElementSibling;
    if (data.sibling.end == null) data.sibling.end = preventEmptySibling(data.range.endContainer.previousSibling) || data.range.endContainer.previousElementSibling;
    
    return data;
}

/**
 * prevent empty sibling 
 * if empty return Null
 * @param Object (Node)
 * @return Object || Null
 */
function preventEmptySibling(elem) {
    return (elem && elem.nodeType == 3 && elem.data && elem.data.trim().length == 0) ? null : elem;
}

/**
 * get all the children of current element
 * - set callback fn on each child
 * @param Object (Node)
 * @param FN (callback function - what to do with the child)
 */
function children(node, callback) {
    var child = node.childNodes;
    child.forEach(function (element) {
        element.children ? children(element, callback) : callback(element);
    }, this);

    return child.length > 0 ? child : false;
}