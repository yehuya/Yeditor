"use strict";

/**
 * creata navigation element (with buttons)
 */

import Config from './../config.js';
import Button from './button/Button.class.js';

export default class Navigation {

    /**
     * __construct
     * create navigation
     * @param Array Of Object (buttons array)
     * @param String (navigation id)
     * @param String (navigation css class) 
     */
    constructor(buttons, id, cssClass) {
        this.config = Config.nav;
        this.buttons = buttons;
        this.id = id;
        this.cssClass = cssClass;
        this.elem;

        this.create();
    }

    /**
     * create navigation element (DOM)
     * @return Object
     */
    element() {
        this.elem = document.createElement('nav');
        this.elem.id = this.id;
        this.elem.classList.add(this.config.class);
        if (this.cssClass) {
            this.elem.classList.add(this.cssClass);
        }

        return this.elem;
    }

    /**
     * insert nav element into the document.body
     * @param Object (DOM element)
     */
    insertIntoBody() {
        return document.body.appendChild(this.elem);
    }

    /**
     * append DOM element into the nav 
     * @param Object (nav element)
     * @param Object (DOM element)
     */
    append(Node) {
        return this.elem.appendChild(Node);
    }

    /**
     * insert edit button into nav
     * @param Object (nav element)
     * @param Array (buttons)
     */
    insertEditButtons() {
        this.buttons.forEach(function(element) {
            this.append(element);
        }, this);
    }

    /**
     * create navigation
     * @param String (nav id)
     * @param Array (buttons element)
     * - create nav
     * - append edit button into nav
     * - append nav into body
     */
    create() {
        this.element();
        this.insertEditButtons();
        this.insertIntoBody();
    }

    /**
     * add button into the navigation
     * @param Object
     */
    addButton(object) {
        var btn = new Button(object);
        this.append(btn);
    }

    /**
     * get all buttons name in the nav
     * @return Array
     */
    getAllButtonsName() {
        var getButtons = Array.prototype.slice.call(this.elem.querySelectorAll('[' + Config.button.areaNameAttr + ']'), 0);
        var arr = getButtons.map(elem => { return elem.getAttribute(Config.button.areaNameAttr) });
        return arr;
    }
}