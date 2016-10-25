"use strict";

import Config from './../../config.js';
import Navigation from './../Navigation.class.js';
import Buttons from './../button/Buttons.js';

export default class EditImage {
    /**
     * __construct
     * create navigation
     * add hide nav event
     */
    constructor() {
        this.config = Config.editImage;
        this.nav;
        this.navigation();
        this.hideEvent();
    }

    /**
     * create edit image navigation
     * by Navigation class
     */
    navigation() {
        this.nav = new Navigation(Buttons.getEditImageButton(), this.config.navId);
        return this.nav;
    }

    /**
     * hide navigation when user leaves the current image
     * - remove the current image
     */
    hideEvent() {
        var self = this;

        window.addEventListener('click', function(event) {
            if (self.nav.elem.classList.contains(self.config.navActiveClass)) {
                EditImage.hide();
            }
        });

        // prevent nav hiding when nav button clicked
        this.nav.elem.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    /**
     * get navigation element by id
     * @return Object (Node)
     */
    static getNavigation() {
        return document.getElementById(Config.editImage.navId);
    }

    /**
     * show navigation above the current image
     * @param Object (Node element - the current image)
     */
    static show(Node) {
        var nav = EditImage.getNavigation();
        var position = Node.getBoundingClientRect();

        nav.classList.add(Config.editImage.navActiveClass);
        nav.style.left = position.left + window.scrollX + 'px';
        nav.style.top = position.top + window.scrollY + 'px';
    }

    /**
     * hide edit image navigation
     * - remove the current image 
     */
    static hide() {
        var nav = EditImage.getNavigation();
        nav.classList.remove(Config.editImage.navActiveClass);
        EditImage.removeCurrentImage();
    }

    /**
     * set image - editable
     * @param Object (Node)
     */
    static setImage(image) {
        image.addEventListener('click', function(event) {
            event.stopPropagation();
            event.preventDefault();

            EditImage.show(this);
            EditImage.setCurrentImage(this);
        });
    }

    /**
     * set all element images child - editable
     * @param Object (Node - parent)
     */
    static setAllImages(element) {
        var allImages = element.getElementsByTagName('img');
        for (let i = 0; i < allImages.length; i++) {
            EditImage.setImage(allImages[i]);
        }
    }

    /**
     * get current image (that user click on it)
     * @return Object (Node)
     */
    static getCurrentImage() {
        var getByClass = document.getElementsByClassName(Config.editImage.currentImageClass);
        return getByClass.length > 0 ? getByClass[0] : null;
    }

    /**
     * set current image by adding class to the clicked image
     * @param Object (Node element - the clicked image)
     */
    static setCurrentImage(element) {
        EditImage.removeCurrentImage();
        element.classList.add(Config.editImage.currentImageClass);
    }

    /**
     * remove the current image by removing the class from the image
     */
    static removeCurrentImage() {
        var get = document.getElementsByClassName(Config.editImage.currentImageClass);
        for (let i = 0; i < get.length; i++) {
            get[i].classList.remove(Config.editImage.currentImageClass)
        }
    }
}