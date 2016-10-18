"use strict";

import Button from './Button.class.js';
import { image as btn_image } from './image.array.js';
import { nav as btn_nav } from './nav.array.js';
import { text as btn_text } from './text.array.js';

const exports = module.exports;

/**
 * get all button object from the default array
 * create Node element from each btn object
 * insert new button element into array of btn elements
 * @return Array of Object (btn elements)
 */
exports.get = function(){
    var allArrayOfTheBtn = [].concat(btn_image, btn_nav, btn_text);
    var readyBtn = [];

    allArrayOfTheBtn.forEach(function (object) {
        var btn = new Button(object);
        readyBtn.push(btn);
    }, this);

    return readyBtn;
}