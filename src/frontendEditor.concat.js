/**
 * edit text on the document
 */

/**
 * __constructor
 */
function Text(){
    this.DOM = null

    this.get();
    this.edit();
}

/**
 * get all Text item for Editable
 * @return Array
 */
Text.prototype.get = function(){
    this.DOM = document.querySelectorAll('[Edit="text"]');

    return this.DOM;
}

/**
 * add 'contenteditable' Attr to all the DOM elements
 */
Text.prototype.edit = function(){
    for(var i = 0 ; i < this.DOM.length ; i++){
        this.DOM[i].setAttribute('contenteditable', 'true');
    }
}

/**
 * get selected text in editable DOM
 * for Chrom, Sfari, Firefox, IE
 * @return Object (getSelection)
 */
Text.prototype.getSelection = function(){
    var select = false;

    if(window.getSelection && window.getSelection().toString()){
        select = window.getSelection();
    }else if(document.getSelection && document.getSelection.toString()){
        select = document.getSelection();
    }else{
         var selection = document.selection && document.selection.createRange();
         if(typeof selection !== 'undefined' && selection.text && selection.text.toString()){
             select = selection.text;
         }
    }

    return select;
}

/**
 * insert selected text into DOM (node)
 * @param Object (Node | DOM)
 */
Text.prototype.surroundSelection = function(Node){
    var selected = this.getSelection();
   
    if(selected && selected.rangeCount){
        var range = selected.getRangeAt(0).cloneRange();
        range.surroundContents(Node.cloneNode());
        selected.removeAllRanges();
        selected.addRange(range);
    }
}

/**
 * remove html tag of the selected text
 * @param Object (this Node will remove)
 */
Text.prototype.removeSurroundSelection = function(Node){
    var selected = this.getSelection();

    if(selected && selected.rangeCount){
        var newText = document.createTextNode(selected.toString());
        var parent = Node.parentElement;

        parent.insertBefore(newText, Node);
        parent.parentElement.removeChild(Node);
    }
}

// var b = document.createElement('strong');
// a.surroundSelection(b);
// a.removeSurroundSelection()
/**
 * Attribute "Edit" = DOM will be editable
 * Item editable - onClick
 */

// edit text Attr: Edit="text"
// edit image Attr: Edit="image"
// edit background-image Attr: Edit="image-background"
// the Name of the editable content Attr: name="<name>" (for send item data)

// text
var a = new Text();