"use strict";

import Button from './Button.class.js';
import { image as btn_image } from './image.array.js';
import { nav as btn_nav } from './nav.array.js';
import { text as btn_text } from './text.array.js';
import { editImage as editImageButton } from './editImage.array.js';

const exports = module.exports;

/**
 * get all button for main navigation
 */
exports.getMainNavButton = function(){
    var allArrayOfTheBtn = [].concat(btn_image, btn_nav, btn_text);
    return exports.createAllButtons(allArrayOfTheBtn);
}

/**
 * get all button for edit image navigation
 */
exports.getEditImageButton = function(){
    return exports.createAllButtons(editImageButton);
}

/**
 * create button from object by Button class
 * - get array of button object
 * - return array of button element
 * @param Array
 * @return Array
 */
exports.createAllButtons = function(array){
    var ready_button = [];
    array.forEach(function(button){
        let btn = new Button(button);
        ready_button.push(btn);
    });
    return ready_button;
}