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
 */
Text.prototype.selected = function(){

}

// var el = document.getElementById('hello');
// var sel = window.getSelection();
// var range = document.createRange();
// range.selectNodeContents(el); 
// sel.removeAllRanges();
// sel.addRange(range);


var startPar = document.createElement('p');
// var endLi = [the second li node];
range.setStart(startPar,13);
// range.setEnd(endLi,17);
/**
 * Attribute "Edit" = DOM will be editable
 * Item editable - onClick
 */

// edit text Attr: Edit="text"
// edit image Attr: Edit="image"
// edit background-image Attr: Edit="image-background"
// the Name of the editable content Attr: name="<name>" (for send item data)

// text
new Text();