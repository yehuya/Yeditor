"use strict";

/**
 * set the element as editable
 */

import Config from './../config.js';
import EditImage from './image/EditImage.class.js';
import EditBackgound from './image/EditBackground.class.js';

export default class Editable {

    /**
     * __construct
     * get editable area options and extends them with the default options
     * this.set()
     * @param Object (Node)
     * @param Object (options)
     */
    constructor(element, options) {
        this.config = Config.editable;
        this.attrs = this.config.attribute;
        this.element = element;
        this.options = Config.extends(this.config.default, options);

        this.set();
        this.setImageAndBackground();
    }

    /**
     * set children element with images and background as editable by the nav of image or background
     */
    setImageAndBackground() {
        EditImage.setAllImages(this.element);
        EditBackgound.setAllbackground(this.element);
    }

    /**
     * add element attribute
     * @param String
     * @param String
     */
    addAttr(name, value) {
        this.element.setAttribute(name, value);
    }

    /**
     * remove element attribute
     * @param String
     * @param String
     */
    removeAttr(name) {
        this.element.removeAttribute(name);
    }

    /**
     * set editable area attribute
     * - check if has attribure for this options 
     */
    set() {
        this.addAttr(this.attrs.plugin, this.attrs.plugin);
        this.addAttr('contenteditable', 'true');
        for (let key in this.options) {
            if (this.attrs.hasOwnProperty(key)) {
                this.addAttr(this.attrs[key], this.options[key]);
            }
        }
    }

    /**
     * set contenteditable = fales
     */
    unset() {
        this.addAttr('contenteditable', 'false');
    }

    /**
     * remove all editable area attribure include contenteditable
     */
    destroy() {
        this.removeAttr(this.attrs.plugin);
        this.removeAttr('contenteditable');
        for (let key in this.options) {
            if (this.attrs.hasOwnProperty(key)) {
                this.removeAttr(this.attrs[key]);
            }
        }
    }
}