const exports = module.exports;
const prefix = 'frontendEditor';

/**
 * concat two objects
 * @param Object (def)
 * @param Object (set)
 * @return Object (def with new value of set)
 */
exports.extends = function(def, set){
    for(let key in set){
        if(def.hasOwnProperty(key)){
            def[key] = set[key];
        }
    }

    return def;
}

/**
 * @for Editor.class.js
 * @for Editable.class.js
 * @for Element.class.js
 * @for ajax/Serialize.class.js
 */
exports.editable = {
    prototype: 'editable',
    attribute: {
        name: `${prefix}-name`,
        background: `${prefix}-bg`,
        bgExists: `${prefix}-bg-exists`,
        image: `${prefix}-image`,
        html: `${prefix}-html`,
        /**
        * attribute says - this is our plugin editable area 
        * toLowerCase - prevent bug: the browser render attribute name as lowercase
        * @for Selection.class.js 
        * @for Editable.class.js 
        * @for Element.class.js
        */
        plugin: prefix.toLowerCase() 
    },
    default: {
        name: null,
        type: 'inline',
        background: true,
        bgExists: true, // background editable only if bg element allready exists
        image: true,
        html: false
    }
}

/**
 * @for editor/Nav.class.js
 */
exports.nav = {
    navClass: `${prefix}-nav`,
    navTextId: `${prefix}-nav-text`,
    navImageId: `${prefix}-nav-image`,
    navMainId: `${prefix}-nav-main`
}

/**
 * @for editor/button/*.class.js
 */
exports.button = {
    btnClass: `${prefix}-nav-btn`
}

/**
 * @for ajax/Ajax.class.js
 * @for ajax/Serialize.class.js
 */
exports.ajax = {
    url: 'http://localhost',
    method: 'POST',
    header: {},
    success: function(data){console.log(data, 'success')},
    done: function(data){console.log(data, 'done')},
    failed: function(data){console.log(data, 'error')}
}

/**
 * @for image/Image.class.js
 */
exports.image = {
    upload: null,
}
