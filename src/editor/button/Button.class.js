"use strict";

/**
 * Create button element from object
 * @example button object 
 * {
 *   @name: 'test', // btn name
 *   @description: 'test btn', // btn description - for title tag - optional
 *   @class: 'test-btn', // [] for multiple,  add class to this btn - optional
 *   @align: 'center' || 'left' || 'right' // the align of the button
 *   @text: 'test', // insert text into the btn - optional
 *   @id: 'test-btn', // add id to this btn - optional
 *   @element: document.createElement('button').cloneNode(), // btn element - optional
 *   @event: [
 *             {
 *                 @name: 'click',
 *                 @fn: function(){
 *                     console.log('test');
 *                 }
 *             }
 *         ],// btn event || for multiple event use []
 * }
 */

import Config from './../../config.js';

export default class Button {
    /**
     * __construct
     * @param Object (button)
     * @return Object (Node element)
     */
    constructor(btn) {
        this.config = Config.button;

        return this.create(btn);
    }

    /**
     * create btn from object 
     * @param Object
     * @property name, description, class, text, id, element, event, align 
     * @return Object
     */
    create(btn) {
        this.elem = this.constructor.isDOM(btn.element) ? btn.element : this.element();
        this.class(btn.class, btn.align);
        this.elem.title = btn.description || null;
        this.elem.id = btn.id || null;

        if (btn.text && btn.text.length > 0) this.elem.appendChild(document.createTextNode(btn.text));

        this.event(btn.event);

        return this.elem;
    }

    /**
     * default button element
     * @return Object (dom element)
     */
    element() {
        return document.createElement(this.config.tagName).cloneNode();
    }

    /**
     * add class to btn element
     * @param String || Array (the button.classs)
     * @param String (the button.align)
     */
    class(classes, align) {
        this.elem.classList.add(this.config.class);

        if (align == 'right' || align == 'left') {
            this.elem.classList.add(align);
        } else {
            this.elem.classList.add('center');
        }

        if (Array.isArray(classes)) {
            classes.forEach(function (cls) {
                this.elem.classList.add(cls);
            }, this);
        } else if (classes) {
            this.elem.classList.add(classes);
        }
    }


    /**
     * create button events
     * @param Array of Object || Object (events)
     * @param Object (dom element)
     */
    event(events) {
        if (Array.isArray(events)) {
            events.forEach(function (event) {
                this.elem.addEventListener(event.name, event.fn);
            }, this);
        } else if (events) {
            this.elem.addEventListener(events.name, events.fn);
        }
    }

    /**
     * check if object is HTML DOM element
     */
    static isDOM(element) {
        return (
            typeof HTMLElement === "object" ? element instanceof HTMLElement : element && typeof element === "object" && element !== null
        );
    }
}
