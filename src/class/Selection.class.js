import Config from './../config.js';

/**
 * class for user selection
 */
export default class Selection {
    
    /**
     * __construct
     * @return Object (this)
     */
    constructor(){
        this.config = Config.editable;
    }

    /**
     * return user selection 
     * @return Object || Boolean
     */
    get(){
        if(window.getSelection && window.getSelection().toString()){
            return window.getSelection();
        }

        if(document.getSelection && document.getSelection.toString()){
            return document.getSelection();
        }

        var selection = document.selection && document.selection.createRange();
        if(typeof selection !== 'undefined' && selection.text && selection.text.toString()){
            return selection.text;
        }

        return false;
    }

    /**
     * get user selection text
     * @return String
     */
    text(){
        var selected = this.get();

        if(selected){
            return selected.toString();
        }
    }

    /**
     * insert selected text into DOM (node)
     * @param Object (Node | DOM)
     */
    append(Node){
        var selected = this.get();
    
        if(selected && selected.rangeCount){
            let range = selected.getRangeAt(0).cloneRange();
            range.surroundContents(Node.cloneNode());
            selected.removeAllRanges();
            selected.addRange(range);
        }
    }

    /**
     * get parent element of user selection
     * @return Object
     */
    parent(){
        return this.get().anchorNode.parentElement;
    }

    /**
     * check if the area of user selection is editable
     * - check if parent node is editable
     */
    parentEditable(){
        var parent = this.parent();
        var editable = false;

        while(parent){
            if(parent.tagName.toLowerCase() == this.config.htmlTag.toLowerCase()){
                editable = true;
                break;
            }

            parent = parent.parentElement;
        }

        return editable;
    }

    /**
     * remove user selection dom element
     * (remove the selection parent element itself not the innerText)
     * the param Node need to be object that already exist in the document
     * @param Object (Node | DOM)
     */
    remove_dom(Node){
        var selected = this.get();

        if(selected && selected.rangeCount){
            let newText = document.createTextNode(this.text());
            let parent = Node.parentElement;

            parent.insertBefore(newText, Node);
            parent.removeChild(Node);
        }
    }
}