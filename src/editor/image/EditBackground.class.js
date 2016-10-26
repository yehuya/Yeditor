"use strict";

import Config from './../../config.js';
import Navigation from './../Navigation.class.js';
import Buttons from './../button/Button.helper.js';

export default class EditBackground {
    /**
     * __construct
     * create navigation
     * add hide nav event
     */
    constructor() {
        this.config = Config.EditBackground;
        this.nav;
        this.navigation();
    }

    /**
     * create edit image navigation
     * by Navigation class
     */
    navigation() {
        this.nav = new Navigation(Buttons.getEditBackgroundButton(), this.config.navId);
        return this.nav;
    }

    /**
     * get navigation element by id
     * @return Object (Node)
     */
    static getNavigation() {
        return document.getElementById(Config.EditBackground.navId);
    }

    /**
     * show navigation above the current background element
     * @param Object (Node element - the current background element)
     */
    static show(Node) {
        var nav = EditBackground.getNavigation();
        var position = Node.getBoundingClientRect();

        nav.classList.add(Config.EditBackground.navActiveClass);
        nav.style.left = position.left + window.scrollX + 'px';
        nav.style.top = position.top + window.scrollY + 'px';
    }

    /**
     * hide edit background navigation
     * - remove the current background elem 
     */
    static hide() {
        var nav = EditBackground.getNavigation();
        nav.classList.remove(Config.EditBackground.navActiveClass);
        EditBackground.removeCurrentBackground();
    }

    /**
     * set background image - editable
     * @param Object (Node)
     */
    static setBackground(bg) {
        bg.addEventListener('focus', function(event) {
            event.stopPropagation();
            event.preventDefault();

            EditBackground.show(this);
            EditBackground.setCurrentBackground(this);

            this.addEventListener('blur', EditBackground.hide);
        });
    }

    /**
     * set all element child background - editable 
     * update set background when drag and drop
     * @param Object (Node - parent)
     * @param Boolean (for dragAndDrop event)
     */
    static setAllbackground(element) {
        var getAllBg = Array.prototype.slice.call(element.getElementsByTagName('*'), 0);
        getAllBg.push(element); // add the element himself

        var filterElem = getAllBg.filter(elem => {
            return elem.style.backgroundImage;
        });

        filterElem.forEach(elem => {
            EditBackground.setBackground(elem);
        });
    }

    /**
     * get current image (that user click on it)
     * @return Object (Node)
     */
    static getCurrentBackground() {
        var getByClass = document.getElementsByClassName(Config.EditBackground.currentImageClass);
        return getByClass.length > 0 ? getByClass[0] : null;
    }

    /**
     * set current image by adding class to the clicked image
     * @param Object (Node element - the clicked image)
     */
    static setCurrentBackground(element) {
        EditBackground.removeCurrentBackground();
        element.classList.add(Config.EditBackground.currentImageClass);
    }

    /**
     * remove the current image by removing the class from the image
     */
    static removeCurrentBackground() {
        var get = document.getElementsByClassName(Config.EditBackground.currentImageClass);
        for (let i = 0; i < get.length; i++) {
            get[i].classList.remove(Config.EditBackground.currentImageClass)
        }
    }
}