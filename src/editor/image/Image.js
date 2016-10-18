"use strict";

import Config from './../../config.js';
import Selection from './../selection/Selection.class.js';
import Base64 from './Base64.js';

/**
 * image helper function 
 */

const exports = module.exports;


/**
 * append this.img into user selection
 * @param String (url)
 * @return Object (this.img) 
 */
exports.insertImage = function(url) {
    var selection = new Selection();
    var img = document.createElement('img');
    img.src = url;

    selection.insert(img);
    return img;
}

exports.insertBackground = function(url) {
    var selection = new Selection();
    var parent = selection.parent();

    parent.style.backgroundImage = 'url(' + url + ')';
    return parent;
}

exports.uploadBackground = function(file) {
    if (typeof Config.image.uploadBackground == 'function') {
        Config.image.uploadBackground(file);
    } else {
        Base64.image(file, function (url, file) {
            exports.insertBackground(url);
        });
    }
}

exports.uploadImage = function(file) {
    if (typeof Config.image.uploadImage == 'function') {
        Config.image.uploadImage(file);
    } else {
        Base64.image(file, function (url, file) {
            exports.insertImage(url);
        });
    }
}
