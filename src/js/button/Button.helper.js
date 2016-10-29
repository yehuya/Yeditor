"use strict";

/**
 * helper function for Button
 * create buttons element array for all the navigation
 * the button come from default array of the buttons
 */

import Config from './../../config.js';
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
    return exports.createAllButtons(allArrayOfTheBtn, Config.nav.order);
}

/**
 * create button
 * @for Edit image nav
 */
exports.getEditImageButton = function() {
    return exports.createAllButtons(editImageButton, Config.editImage.order);
}

/**
 * create button 
 * @for Edit backgound nav
 */
exports.getEditBackgroundButton = function() {
    return exports.createAllButtons(editBackgroundButton, Config.EditBackground.order);
}

/**
 * create button from object by Button class
 * - get array of button object
 * - sort the button array
 * - return array of button element
 * @param Array Of Object
 * @return Array Of Object
 */
exports.createAllButtons = function(array, order) {
    var ready_button = [];

    // sort 
    array = exports.sort(order, array);

    array.forEach(function(button) {
        let separation;
        if (separation = exports.separation(button)) { // separation button
            ready_button.push(separation);
        } else {
            let btn = new Button(button);
            ready_button.push(btn);
        }
    });

    return ready_button;
}

/**
 * sort array by other array
 * @param Array (the other array)
 * @param Array (will be sorted)
 * @return Array 
 */
exports.sort = function(sort, resort) {
    var newArr = [];
    sort.forEach(elem => {
        // for separation button
        if (Array.isArray(elem)) return newArr.push(elem)

        resort.forEach((el, i) => {
            if (el.name == elem) {
                newArr.push(el);
                resort.splice(i, 1);
                return;
            }
        });
    });

    return newArr.concat(resort);
}

/**
 * allow separation button inside the sort array in exports.sort fn
 * check if the @param is Array and create elem with the array value inside as innerHTML
 * else return false
 * @param Array
 * @return Object (Node) || Boolean (false)
 */
exports.separation = function(button) {
    if (Array.isArray(button)) {
        var btn = document.createElement('div');
        btn.classList.add(Config.button.separationClass);
        btn.innerHTML = button[0];
        return btn;
    } else {
        return false;
    }
}