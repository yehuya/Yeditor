/**
 * edit text on the document
 */

/**
 * __constructor
 * @param Object (options)
 */
function Text(option){
    this.DOM = null
    this.options = extendOption({
        edit_class: null
    }, option);

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
 * add editor css class to all the DOM elements
 */
Text.prototype.edit = function(){
    for(var i = 0 ; i < this.DOM.length ; i++){
        this.DOM[i].setAttribute('contenteditable', 'true');
        this.DOM[i].classList.add(this.options.edit_class);
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

/**
 * extends two objects
 * @param Object (the base object)
 * @param Object
 */
var extendOption = function(def, set){
    for(var n in set){
        if(def.hasOwnProperty(n)){
            def[n] = set[n];
        }
    }

    return def;
}
/**
 * Attribute "Edit" = DOM will be editable
 * Item editable - onClick
 */

// edit text Attr: Edit="text"
// edit image Attr: Edit="image"
// edit background-image Attr: Edit="image-background"
// the Name of the editable content Attr: name="<name>" (for send item data)

/**
 * frontendEditor __constructor
 * @param Object (plugin options)
 */
function frontendEditor(option){
    this.options = extendOption({
        classes: {
            text: 'frontendEditor-text',
            image: 'frontendEditor-image'
        }
    }, option);

    this.text = new Text({
        edit_class: this.options.classes.text    
    });
}

/**
 * extends two objects
 * @param Object (the base object)
 * @param Object
 */
var extendOption = function(def, set){
    for(var n in set){
        if(def.hasOwnProperty(n)){
            def[n] = set[n];
        }
    }

    return def;
}

var a = new frontendEditor();