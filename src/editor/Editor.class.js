import Config from './../config.js';
import Editable from './Editable.class.js';
import Navigation from './Navigation.class.js';
import Image from './image/Image.js';
import EditImage from './image/EditImage.class.js';
import Base64 from './image/Base64.js';
import Selection from './selection/Selection.class.js';
import Buttons from './button/Buttons.js';
import { CodeMirror } from './Code.js';

/**
 * Editor main class
 */
export default class Editor {
    /**
     * __construct
     * add element editable prototype
     * add editor navigation
     */
    constructor(options){
        window.Element.prototype[Config.editable.prototype] = this.editable;
        
        var mainNav = new Navigation(Buttons.getMainNavButton(), Config.nav.id);
        var editImage = new EditImage();

        if(options){
            if(options['uploadImage']) Config.image.uploadImage = options.uploadImage;
            if(options['uploadBackground']) Config.image.uploadBackground = options.uploadBackground;
            if(options['url']) Config.ajax.url = options.url;
            if(options['method']) Config.ajax.method = options.method;
            if(options['done']) Config.ajax.done = options.done;
            if(options['success']) Config.ajax.success = options.success;
            if(options['failed']) Config.ajax.failed = options.failed;
        }

        this.api = {
            image: Image,
            base64: Base64,
            selection: Selection,
            navigation: {
                main: mainNav,
                image: editImage.nav 
            },
            code: CodeMirror,
            editImage: EditImage
        }

        return this;
    }

    /**
     * edit this area
     * add all the data attribute
     * @param Object (editable area options)
     */
    editable(options){  
        return new Editable(options, this);
    }    
    
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