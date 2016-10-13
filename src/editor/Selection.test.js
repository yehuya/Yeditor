import Config from './../config.js';
import Element from './Element.class.js';

/**
 * class for user selection
 */
export default class SelectionTest {

    /**
     * __construct
     * @return Object (this)
     */
    constructor() {
        this.config = Config.editable;
        this.element = new Element();
    }

    /**
     * return user selection 
     * @return Object || Boolean
     */
    get() {
        if (window.getSelection && window.getSelection().toString()) {
            return window.getSelection();
        }

        if (document.getSelection && document.getSelection.toString()) {
            return document.getSelection();
        }

        var selection = document.selection && document.selection.createRange();
        if (typeof selection !== 'undefined' && selection.text && selection.text.toString()) {
            return selection.text;
        }

        return false;
    }

    /**
     * get user selection text
     * @return String
     */
    text() {
        var selected = this.get();
        return selected ? selected.toString() : null;
    }

    /**
     * insert selected text into DOM (node)
     * @param Object (Node | DOM)
     */
    append(FN) {
        var selection = this.get();
        var range = selection.getRangeAt(0);
        var start = range.startContainer;
        var end = range.endContainer;
        var offset = { start: range.startOffset, end: range.endOffset }
        var sibling = { start: range.startContainer.nextSibling, end: range.endContainer.previousSibling }

        this.appendProcess(start, end, sibling, offset, range, FN);
    }

    appendProcess(start, end, sibling, offset, range, FN) {
        var startElement, endElement;

        // same element
        if (start == end) return this.element.appendFromTo(start, offset.start, offset.end, FN);

        // not the same element
        startElement = this.element.appendFromTo(start, offset.start, null, FN);
        endElement = this.element.appendFromTo(end, null, offset.end, FN);

        // refresh sibling after the first appendFromTo fn
        // prevent junk sibling
        if (sibling.start == null) sibling.start = this.element.preventEmptySibling(range.startContainer.nextSibling);
        if (sibling.end == null) sibling.end = this.element.preventEmptySibling(range.endContainer.previousSibling);

        // previousSibling of endContainer is startContainer after append
        if (sibling.end == startElement) return;

        // only 'one' element between end & start
        if (sibling.start == sibling.end && sibling.start != null) {
            var siblingStartChild = this.element.childrenFN(sibling.start, function (elem) {
                this.appendFullElement(elem, FN);
            });

            if (!siblingStartChild) this.appendFullElement(elem, FN);
            return;
        }

        // get all the element between
        this.allElementBetween(sibling, offset, FN);
    }

    allElementBetween(sibling, offset, FN) {
        var next = sibling.start;
        var child, end;

        while (next) {
            // ### children
            end = false;
            child = this.element.childrenFN(next, function (elem) {
                if (!end) this.appendFullElement(elem, FN);
                if (elem == sibling.end) end = true;
            });

            // ### no children
            if (!child && !end) next = this.appendFullElement(elem, FN);

            // ### break
            if (next == sibling.end.toString()) {
                if (end.textContent.toString().substring(0, offset.end) == next.textContent) break;
            }
            if (next == sibling.end || end) break;

            // ### next while
            next = next.nextSibling;
        }
    }

    appendFullElement(node, FN) {
        return this.element.appendFromTo(node, null, null, FN);
    }

    /**
     * get parent element of user selection
     * @return Object | Null
     */
    parent() {
        var selection = this.get().anchorNode;
        // prevent '#text' node as element
        if (selection && selection.nodeType == 3) selection = selection.parentElement;

        return selection ? selection : null;
    }

    /**
     * check if the area of user selection is editable
     * - check if parent node is editable
     */
    parentEditable() {
        var parent = this.parent();
        var editable = false;

        while (parent) {
            if (parent.getAttribute('contenteditable') == 'true'
                && parent.getAttribute(this.config.attribute.plugin) == this.config.attribute.plugin) {
                editable = true;
                break;
            }

            parent = parent.parentElement;
        }

        return editable;
    }


}