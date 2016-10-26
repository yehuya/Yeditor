"use strict";

/**
 * Create CodeMirror object
 * @url https://codemirror.net/
 * helper function for codemirror
 */

require('codemirror/lib/codemirror.css');
import CodeMirror from 'codemirror';
import htmlmixed from 'codemirror/mode/htmlmixed/htmlmixed';

const exports = module.exports;

/**
 * init CodeMirror
 * the main function
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

/**
 * get codemirror elemet
 */
exports.element = function() {
    return document.getElementsByClassName('CodeMirror')[0];
}

/**
 * toggle - hide / show codemirror elem
 */
exports.toggleShow = function() {
    exports.element().classList.toggle('active');
}