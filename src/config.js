const exports = module.exports;
const prefix = 'frontendEditor-';

/**
 * config for Editable.class.js
 */
exports.editable = {
    htmlTag: 'edit',
    nameAttribute: 'name'
}

/**
 * config for editor/Nav.class.js
 */
exports.nav = {
    navClass: `${prefix}-nav`,
    navTextId: `${prefix}nav-text`,
    navImageId: `${prefix}nav-image`
}

/**
 * config for editor/Button.class.js
 */
exports.button = {
    btnClass: `${prefix}nav-btn`
}

