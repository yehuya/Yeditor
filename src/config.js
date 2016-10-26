"use strict";

const exports = module.exports;
const prefix = 'frontendEditor'; // the plugin name

exports.prefix = prefix;

/**
 * concat two objects
 * @param Object (def)
 * @param Object (set)
 * @return Object (def with new value of set)
 */
exports.extends = function(def, set) {
    for (let key in set) {
        if (def.hasOwnProperty(key)) {
            def[key] = set[key];
        }
    }

    return def;
}

/**
 * @for Editor.class.js
 * @for Editable.class.js
 * @for ajax/Serialize.class.js
 */
exports.editable = {
    prototype: 'editable',
    attribute: {
        name: `${prefix}-name`,
        /**
         * attribute says - this is our plugin editable area 
         * toLowerCase - prevent bug: the browser render attribute name as lowercase
         * @for Selection.class.js 
         * @for Editable.class.js 
         */
        plugin: prefix.toLowerCase()
    },
    default: {
        name: null
    }
}

/**
 * @for editor/Navigation.class.js
 */
exports.nav = {
    class: `${prefix}-nav`,
    id: `${prefix}-nav`,
}

/**
 * @for editor/image/EditImage.class.js
 */
exports.editImage = {
    navActiveClass: 'active',
    currentImageClass: `${prefix}-current-edit-image`,
    navId: `${prefix}-edit-image-nav`
}

/**
 * @for editor/image/EditBackground.class.js
 */
exports.EditBackground = {
    navActiveClass: 'active',
    currentImageClass: `${prefix}-current-edit-background`,
    navId: `${prefix}-edit-background-nav`
}

/**
 * @for editor/button/Button.class.js
 */
exports.button = {
    class: `${prefix}-nav-btn`,
    tagName: 'button' 
}

/**
 * @for ajax/Ajax.class.js
 * @for ajax/Serialize.class.js
 */
exports.ajax = {
    url: null,
    method: 'POST',
    param: [], // for additional data 
    header: {},
    success: null, //function(data) { console.log(data, 'success') },
    done: null, //function(data) { console.log(data, 'done') },
    failed: null //function(data) { console.log(data, 'error') }
}

/**
 * @for image/Images.class.js
 */
exports.image = {
    uploadImage: null
}