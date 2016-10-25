"use strict";

/**
 * Create CodeMirror object
 * https://codemirror.net/
 */

require('codemirror/lib/codemirror.css');
import CodeMirror from 'codemirror';
import htmlmixed from 'codemirror/mode/htmlmixed/htmlmixed';

const exports = module.exports;

/**
 * init CodeMirror
 */
exports.CodeMirror = CodeMirror(document.body, {
    mode: 'htmlmixed',
    theme: "default",
    lineNumbers: true,
    tabSize: 4,
});

/**
 * for event - change
 * the function of the event 
 * @exapmle CodeMirror.on('change', ChangeEventFn);
 * @Fix issue: CodeMirror.off('change', fn) not recognize the fn
 */
exports.EventFn = {
    change: null
};

exports.element = function() {
    return document.getElementsByClassName('CodeMirror')[0];
}

exports.toggleShow = function() {
    exports.element().classList.toggle('active');
}