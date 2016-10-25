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

exports.imageUrl = function(file, callback) {
    if (typeof Config.image.uploadImage == 'function') {
        Config.image.uploadImage(file, function(url){
            callback(url);
        });
    } else {
        Base64.image(file, function (url, file) {
            //exports.insertImage(url);
            callback(url);
        });
    }
}