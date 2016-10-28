"use strict";

/**
 * get user selection and append it inside new element
 */

export default class Append {

    /**
     * __consturct
     * @param Object (user selection range)
     * @param FN (what to do with the user selection)
     */
    constructor(range, FN) {
        this.data = this.rangeData(range, FN);

        this._CONTINUE;
        this._END_CONTAINER;
        this._HAS_CHILDREN;
        this._BREAK_WHILE;

        this.process();
    }

    /**
     * the main process function
     * get the user selection and append it into new element
     */
    process() {
        this._CONTINUE = true;

        // same element
        this.level1();
        if (!this._CONTINUE) return;

        // not the same element
        // refresh sibling after the first appendFromTo fn
        // prevent junk sibling
        this.level2();
        if (!this._CONTINUE) return;

        // only 'one' element between end & start
        this.level3();
        if (!this._CONTINUE) return;

        // get all the element between
        this.level4();
    }

    /**
     * same element
     */
    level1() {
        var data = this.data;
        if (data.start == data.end) {
            this.appendFromTo(data.start, data.offset.start, data.offset.end, data.fn);
            this._CONTINUE = false;
        }
    }

    /*
     * not the same element
     * refreshSibling
     */
    level2() {
        var data = this.data;
        var startElement = this.appendFromTo(data.start, data.offset.start, null, data.fn);
        var endElement = this.appendFromTo(data.end, null, data.offset.end, data.fn);

        this.refreshSibling(data);

        if (endElement.parentElement && data.sibling.start == endElement.parentElement ||
            data.sibling.end == startElement) this._CONTINUE = false;
    }

    /*
     * only 'one' element between end & start
     */
    level3() {
        var self = this;
        var data = this.data;

        if (data.sibling.start == data.sibling.end && data.sibling.start != null) {

            var siblingStartChild = this.children(data.sibling.start, function(elem) {
                self.append(elem, data.fn);
            });

            if (!siblingStartChild) this.append(data.sibling.start, data.fn);

            this._CONTINUE = false;
        }
    }

    /*
     * get all the element between
     */
    level4() {
        var data = this.data;
        var next = data.sibling.start;
        var child, isTheEndContainer;

        this._BREAK_WHILE = false;

        while (next) {

            this._END_CONTAINER = false;
            this._HAS_CHILDREN = false;

            // check if next have children
            this.level4_1(next);

            // ### no children
            next = this.level4_2(next);

            // ### break
            this.level4_3b(next);
            if (this._BREAK_WHILE) break;

            this.level4_4b(next);
            if (this._BREAK_WHILE) break;

            // ### next while
            next = this.preventEmptySibling(next.nextSibling) || next.nextElementSibling;
        }
    }

    /**
     * while: children
     * @param Object (Node element)
     */
    level4_1(next) {
        var data = this.data;
        var self = this;

        var child = this.children(next, function(elem) {
            if (!self._END_CONTAINER) self.append(elem, data.fn);
            if (elem == data.sibling.end) self._END_CONTAINER = true;
        });

        return child ? this._HAS_CHILDREN = true : this._HAS_CHILDREN = false;
    }

    /**
     * while: no-children
     * @param Object (Node element)
     * @return Object (Node element)
     */
    level4_2(next) {
        return !this._HAS_CHILDREN && !this._END_CONTAINER ? next = this.append(next, this.data.fn) : next;
    }

    /**
     * while: break
     * @param Object (Node element)
     */
    level4_3b(next) {
        var data = this.data;

        if (data.sibling.end && next == data.sibling.end.toString()) {
            if (data.end.textContent.toString().substring(0, data.offset.end) == next.textContent) this._BREAK_WHILE = true;
        }
    }

    /**
     * while: break
     * @param Object (Node element)
     */
    level4_4b(next) {
        if (next == this.data.sibling.end || this._END_CONTAINER) this._BREAK_WHILE = true;
    }

    /**
     * order the range (user selection) object for the process function
     * @param Object (range)
     * @param FN (what to do with the selection)
     * @return Object
     */
    rangeData(range, FN) {
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
     * @return Object (range data)
     */
    refreshSibling() {
        var data = this.data;
        if (data.sibling.start == null) data.sibling.start = this.preventEmptySibling(data.range.startContainer.nextSibling) || data.range.startContainer.nextElementSibling;
        if (data.sibling.end == null) data.sibling.end = this.preventEmptySibling(data.range.endContainer.previousSibling) || data.range.endContainer.previousElementSibling;

        return data;
    }

    /**
     * prevent empty sibling 
     * if empty return Null
     * @param Object (Node)
     * @return Object || Null
     */
    preventEmptySibling(elem) {
        return (elem && elem.nodeType == 3 && elem.data && elem.data.trim().length == 0) ? null : elem;
    }

    /**
     * get all the children of current element
     * - set callback fn on each child
     * @param Object (Node)
     * @param FN (callback function - what to do with the child)
     */
    children(node, callback) {
        var child = node.childNodes;
        child.forEach(function(element) {
            element.children ? this.children(element, callback) : callback(element);
        }, this);

        return child.length > 0 ? child : false;
    }

    /**
     * helper fn for appendFromTo
     * insert all the element into new element (@from = null, @to = null)
     * @param Object (Node)
     * @param FN (append the element)
     * @return Object (Node)
     */
    append(node, FN) {
        return this.appendFromTo(node, null, null, FN);
    }

    /**
     * append part from element into new element
     * @param Object (Node)
     * @param Number || Null (offset start, null = 0)
     * @param Number || Null (offset end, null = node.length)
     * @param FN (append the important part into new element - this happend in FN)
     * @return Object (the important part - Node)
     */
    appendFromTo(node, from, to, FN) {
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

        if (before.length > 0) parent.insertBefore(this.constructor.createTextNode(before), nextSibling);
        if (main) parent.insertBefore(main, nextSibling);
        if (after.length > 0) parent.insertBefore(this.constructor.createTextNode(after), nextSibling);

        return main;
    }

    /**
     * create Text node
     * @param String 
     * @return Object (text node)
     */
    static createTextNode(text) {
        return document.createTextNode(text).cloneNode(true);
    }

}