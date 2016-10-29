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
 *   @element: document.createElement('button').cloneNode(), // btn element - optional (DOM elem or Function that return DOM elem)
 *   @event: [
 *             {
 *                 @name: 'click',
 *                 @fn: function(){
 *                     console.log('test');
 *                 }
 *             }
 *         ],// btn event, for multiple event use []
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
        var area = this.area(btn.name);

        if (typeof btn.element == 'function') btn.element = btn.element(); // if btn element is function 
        this.elem = this.constructor.isDOM(btn.element) ? btn.element : this.element(); // check if btn element is DOM element
        this.class(btn.class, btn.align);
        this.elem.id = btn.id || null;

        if (btn.text && btn.text.length > 0) this.elem.appendChild(document.createTextNode(btn.text));

        this.event(btn.event);

        var des = this.description(btn.description);

        area.appendChild(this.elem)
        if (des) area.appendChild(des);

        return area;
    }

    /**
     * the button will placed inside this element
     * @param String (the button name)
     * @return Object (Node) || boolean (false)
     */
    area(name) {
        var place = document.createElement('div');
        place.classList.add(this.config.areaClass);
        place.setAttribute(this.config.areaNameAttr, name);

        return place;
    }

    /**
     * create buttton description element
     * @param String (button description)
     * @return Object (Node)
     */
    description(text) {
        if (!text || text.length <= 0) return false;

        var des = document.createElement('div');
        des.classList.add(this.config.descriptionClass);
        des.innerText = text;

        return des;
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

        // if (align == 'right' || align == 'left') {
        //     this.elem.classList.add(align);
        // } else {
        //     this.elem.classList.add('center');
        // }

        if (Array.isArray(classes)) {
            classes.forEach(function(cls) {
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
            events.forEach(function(event) {
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