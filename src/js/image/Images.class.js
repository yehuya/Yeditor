"use strict";

/**
 * class for image - helper function (all the fn is static)
 */

import Config from './../../config.js';
import Selection from './../selection/Selection.class.js';
import EditBackground from './EditBackground.class.js';
import EditImage from './EditImage.class.js';
import Button from './../button/Button.class.js';

export default class Images {
    /**
     * insert new image into user selection
     * @param String (image src)
     * @return Object (Node - image) 
     */
    static insertImageIntoUserSelection(url) {
        var selection = new Selection();
        var img = document.createElement('img');
        img.src = url;

        selection.insert(img);
        EditImage.setImage(img);

        return img;
    }

    /**
     * add background image to element
     * @param String (background url)
     * @param Object (Node)
     * @return Object (Node - element)
     */
    static addBackground(url, element) {
        if(!Button.isDOM(element)) return; // check if element is DOM 

        element.style.backgroundImage = 'url(' + url + ')';
        EditBackground.setBackground(element);

        return element;
    }

    /**
     * get image file and return it as base64 data url
     * @param Object (file)
     * @param FN (callback: url: String, file: Object)
     */
    static base64(file, callback){
        const reader = new FileReader();
        reader.onload = function(event){
            callback(event.target.result, file);
        }
        reader.readAsDataURL(file);
    }

    /**
     * function to get image or bg url by the user definitions (in the plugin init)
     * its to allow upload image into the server
     * ### always use this fn to get image or background url ### 
     * get image url depend on Config.image.uploadImage
     * if there is function in the config above - get the url from this fn
     * else use image base64 for the image url
     * @param Object (file object)
     * @param FN (callback function with 2 args: @url, @file)
     */
    static getURL(file, callback) {
        if (typeof Config.image.uploadImage == 'function') {
            Config.image.uploadImage(file, function(url) {
                callback(url, file);
            });
        } else {
            Images.base64(file, function(url, file) {
                callback(url, file);
            });
        }
    }
}