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

    this.editor = new Editor();
}

/**
 * extends two objects
 * @param Object (the base object)
 * @param Object
 */
window.extendOption = function(def, set){
    for(var n in set){
        if(def.hasOwnProperty(n)){
            def[n] = set[n];
        }
    }

    return def;
}

var a = new frontendEditor();