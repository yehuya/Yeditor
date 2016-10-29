"use strict";

/**
 * Editor main class
 */

import Config from './../config.js';
import Editable from './Editable.class.js';
import Navigation from './Navigation.class.js';
import Images from './image/Images.class.js';
import EditImage from './image/EditImage.class.js';
import EditBackground from './image/EditBackground.class.js';
import Selection from './selection/Selection.class.js';
import Buttons from './button/Button.helper.js';
import Ajax from './ajax/Ajax.class.js';
import Serialize from './ajax/Serialize.class.js';
import { CodeMirror } from './Code.js';

export default class Editor {
    /**
     * __construct
     * setup api
     * init user options
     * init window binding
     * init navigations
     * @param Object (options)
     */
    constructor(options) {
        this.api = {
            image: Images,
            selection: Selection,
            navigation: {
                main: null,
                image: null,
                background: null
            },
            code: CodeMirror,
            edit: {
                image: EditImage,
                background: EditBackground
            },
            ajax: Ajax,
            serialize: Serialize
        }

        this.initOptions(options);
        this.initWindow();
        this.initNavigation();
    }

    /**
     * init user options
     * @param Object (user)
     */
    initOptions(options) {
        if (options && typeof options == 'object') {
            if (options.hasOwnProperty('openNavigation')) Config.nav.openNavigation = options.openNavigation;
            if (options.hasOwnProperty('navOrder')) Config.nav.order = options.navOrder;
            if (options.hasOwnProperty('uploadImage')) Config.image.uploadImage = options.uploadImage;
            if (options.hasOwnProperty('url')) Config.ajax.url = options.url;
            if (options.hasOwnProperty('method')) Config.ajax.method = options.method;
            if (options.hasOwnProperty('done')) Config.ajax.done = options.done;
            if (options.hasOwnProperty('success')) Config.ajax.success = options.success;
            if (options.hasOwnProperty('failed')) Config.ajax.failed = options.failed;
        }
    }

    /**
     * init edit navigation 
     * & update this.api - this.api.navigation[...]
     * - main
     * - image
     * - background
     */
    initNavigation() {
        var close = Config.nav.openNavigation ? false : 'close'; // main navigation open or close
        this.api.navigation.main = new Navigation(Buttons.getMainNavButton(), Config.nav.id, close);

        this.api.navigation.image = new EditImage().nav;
        this.api.navigation.background = new EditBackground().nav;
    }

    /**
     * expose classes to window scope
     * - bind window.Element and Editable.class.js
     */
    initWindow() {
        window.Element.prototype[Config.editable.prototype] = this.bindEditable;
    }

    /**
     * edit this area
     * add all the data attribute
     * @param Object (editable area options)
     */
    bindEditable(options) {
        return new Editable(this, options);
    }
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