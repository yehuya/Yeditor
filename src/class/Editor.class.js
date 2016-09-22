/**
 * Editor main class
 * #### EXAMPLE ####
 */
export default class Editor {
    constructor(options){
        // add editable fn into document.element
        Element.prototype.editable = this.editable(options);
        // create all the editor navigation 
        createNavigation();
    }

    /**
     * edit this area
     * add all the data attribute
     * @param Object (editable area options)
     */
    editable(options){}    
    
    /**
     * add input into editor navigation
     * @for Title
     * @for Description
     * @options: title, name, 
     */
    addEditorInput(options){}
}

/**
 * Example:
 * var b = new Editor({
 *  // upload image into the server and get image url
 *  // the default value is base64 data url
 *  uploadImage: function(file){ 
 *      $.ajax({
 *          url: ...,
 *          data: new FormData(file)
 *      }).done(url){
 *          b.insertImage(url)
 *      }
 *  },
 *  url: ...,
 *  method: ...
 *  done: ...
 *  success: ...
 *  faild: ...
 * });
 * 
 * var a = document.getElementById('test');
 * a.editable({
 *  name: ... // for ajax request key = value
 *  type: popup || regular // the type of editing 
 *  background: true,
 *  onlyIfHasBackground: true // background editable only if element allready has bg 
 *  text: true,
 *  image: true,
 *  html: false
 * });
 * 
 * the plugin create only 'one' editor navigation for all 
 * editable area
 * the 'SAVE' btn send all the the editable area content togther
 */