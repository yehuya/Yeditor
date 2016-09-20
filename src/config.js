const exports = module.exports;
const prefix = 'frontendEditor-';

/**
 * @for Editable.class.js
 * @for element/Element.class.js
 * @for ajax/Serialize.class.js
 */
exports.editable = {
    htmlTag: 'edit',
    nameAttr: 'name',
    typeAttr: 'type'
}

/**
 * @for editor/Nav.class.js
 */
exports.nav = {
    navClass: `${prefix}nav`,
    navTextId: `${prefix}nav-text`,
    navImageId: `${prefix}nav-image`,
    navMainId: `${prefix}nav-main`
}

/**
 * @for editor/button/*.class.js
 */
exports.button = {
    btnClass: `${prefix}nav-btn`
}

/**
 * @for ajax/Ajax.class.js
 */
exports.ajax = {
    url: 'http://localhost',
    method: 'GET',
    header: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    success: function(data){console.log(data, 'success')},
    done: function(data){console.log(data, 'done')},
    failed: function(data){console.log(data, 'error')}
}
