"use strict";

import { process } from './process.js';

/**
 * class for user selection
 */
export default class Selection {
    constructor(){
        this.selected = this.get();
    }

    /**
     * get user selection
     * @return Object || Boolean
     */
    get(){
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
     */
    text(){
        return this.selected ? this.selected.toString() : null;
    }

    /**
     * insert user selection into new element
     * and remove the old selection
     * @param Object (Node element)
     */
    append(FN){
        if(!this.selected) return;
        var range = this.selected.getRangeAt(0);
        
        process(range, FN);
    }

    /**
     * remove user selection text and element
     * @return Object (DocumentFragment)
     */
    remove(){
        if(!this.selected) return;
        var range = this.selected.getRangeAt(0);
        var content = range.extractContents();

        return content;
    }

    /**
     * get parent element of user selection
     * @return Object | Null
     */
    parent(){
        var selection = this.selected.anchorNode;
        // prevent '#text' node as element
        if(selection && selection.nodeType == 3) selection = selection.parentElement; 
        
        return selection ? selection : null;
    }

    /**
     * check if the area of user selection is editable
     * - check if parent node is editable
     */
    parentEditable(){
        var parent = this.parent();
        var editable = false;

        while(parent){
            if(parent.getAttribute('contenteditable') == 'true' 
            && parent.getAttribute(this.config.attribute.plugin) == this.config.attribute.plugin){
                editable = true;
                break;
            }

            parent = parent.parentElement;
        }

        return editable;
    }
}