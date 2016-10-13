import { append as selectionAppend } from './selectionAppend.js';

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
     * @param FN (what to do with the selection text)
     */
    append(FN){
        if(this.selected) selectionAppend(this.selected, FN);
    }

    /**
     * remove selected element
     * @param Object
     */
    remove(element){}
}