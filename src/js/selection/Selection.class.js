"use strict";

import Config from './../../config.js';
import Append from './Append.class.js';

/**
 * class for user selection
 */
export default class Selection {
    /**
     * __consturct
     */
    constructor() {
        this.config = Config.editable;
        this.selected = this.get();
        this.range = (this.selected && this.selected.type != 'None') ? this.selected.getRangeAt(0) : false;
    }

    /**
     * get user selection
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
     * get selected text
     * @return String
     */
    text() {
        return this.selected ? this.selected.toString() : null;
    }

    /**
     * insert user selection into new element
     * and remove the old selection
     * @param FN (in the fn you create element with the text of the user selection)
     * @example function bold(text){
     *   var b = document.createElement('span');
     *   b.style.fontWeight = 'bold';
     * 
     *   text = document.createTextNode(text).cloneNode(true);
     *   b.appendChild(text);
     *  
     *   return b.cloneNode(true); 
     * }
     */
    append(FN) {
        if (!this.selected || this.selected.type == 'Caret' || !this.range) return;
        if (this.parentEditable()) {
            new Append(this.range, FN);
        }
    }

    /**
     * insert element in the start position of the user selection
     * only insert without delete or get user selection text
     * @param Object (Node element)
     */
    insert(Node) {
        if (!this.range) return;
        if (this.parentEditable()) {
            this.range.insertNode(Node);
        }
    }

    /**
     * remove user selection text and element
     * @return Object (DocumentFragment)
     */
    remove() {
        if (!this.range) return;
        if (this.parentEditable()) {
            return this.range.extractContents();
        }
    }

    /**
     * get parent element of user selection
     * @return Object | Null
     */
    parent() {
        var selection = this.selected.anchorNode;
        // prevent '#text' node as element
        if (selection && selection.nodeType == 3) selection = selection.parentElement;

        return selection ? selection : null;
    }

    /**
     * check if the area of user selection is editable
     * - check if parent node is editable
     * @return Boolean || Object (the parent element)
     */
    parentEditable() {
        var parent = this.parent();
        var editable = false;

        while (parent) {
            if (parent.getAttribute('contenteditable') == 'true' &&
                parent.getAttribute(this.config.attribute.plugin) == this.config.attribute.plugin) {
                editable = parent;
                break;
            }

            parent = parent.parentElement;
        }

        return editable;
    }
}