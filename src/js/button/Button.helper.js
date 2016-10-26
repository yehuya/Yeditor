"use strict";

/**
 * helper function for Button
 * create buttons element array for all the navigation
 * the button come from default array of the buttons
 */

import Button from './Button.class.js';
import { image as btn_image } from './default_buttons/image.array.js';
import { nav as btn_nav } from './default_buttons/nav.array.js';
import { text as btn_text } from './default_buttons/text.array.js';
import { editImage as editImageButton } from './default_buttons/editImage.array.js';
import { editBackground as editBackgroundButton } from './default_buttons/editBackground.array.js';


const exports = module.exports;

/**
 * create button
 * @for Main nav
 */
exports.getMainNavButton = function() {
    var allArrayOfTheBtn = [].concat(btn_image, btn_nav, btn_text);
    return exports.createAllButtons(allArrayOfTheBtn);
}

/**
 * create button
 * @for Edit image nav
 */
exports.getEditImageButton = function() {
    return exports.createAllButtons(editImageButton);
}

/**
 * create button 
 * @for Edit backgound nav
 */
exports.getEditBackgroundButton = function() {
    return exports.createAllButtons(editBackgroundButton);
}

/**
 * create button from object by Button class
 * - get array of button object
 * - return array of button element
 * @param Array Of Object
 * @return Array Of Object
 */
exports.createAllButtons = function(array) {
    var ready_button = [];
    array.forEach(function(button) {
        let btn = new Button(button);
        ready_button.push(btn);
    });
    return ready_button;
}