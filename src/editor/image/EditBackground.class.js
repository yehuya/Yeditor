"use strict";

import Config from './../../config.js';
import Navigation from './../Navigation.class.js';
import Buttons from './../button/Buttons.js';

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
        this.hideEvent();
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
     * hide navigation when user leaves the current image
     * - remove the current image
     */
    hideEvent() {
        var self = this;

        window.addEventListener('click', function (event) {
            if (self.nav.elem.classList.contains(self.config.navActiveClass)) {
                EditBackground.hide();
            }
        });

        // prevent nav hiding when nav button clicked
        this.nav.elem.addEventListener('click', function(e){
            e.stopPropagation();
        });
    }

    /**
     * get navigation element by id
     * @return Object (Node)
     */
    static getNavigation() {
        return document.getElementById(Config.EditBackground.navId);
    }

    /**
     * show navigation above the current image
     * @param Object (Node element - the current image)
     */
    static show(Node) {
        var nav = EditBackground.getNavigation();
        var position = Node.getBoundingClientRect();

        nav.classList.add(Config.EditBackground.navActiveClass);
        nav.style.cssText += 'left:' + position.left + ';top:' + position.top + ';';
    }

    /**
     * hide edit image navigation
     * - remove the current image 
     */
    static hide(){
        var nav = EditBackground.getNavigation();
        nav.classList.remove(Config.EditBackground.navActiveClass);
        EditBackground.removeCurrentImage();
    }

    /**
     * set image - editable
     * @param Object (Node)
     */
    static setImage(image) {
        image.addEventListener('click', function (event) {
            event.stopPropagation();
            event.preventDefault();

            EditBackground.show(this);
            EditBackground.setCurrentImage(this);
        });
    }

    /**
     * set all element images child - editable
     * update set image when drag and drop
     * @param Object (Node - parent)
     * @param Boolean (for dragAndDrop event)
     */
    static setAllImages(element, dragAndDrop) {
        var allImages = element.getElementsByTagName('*');
        allImages.map(function(elem){
            if(elem.style.backgroundImage){
                return true;
            }else{
                return false;
            }
        });
        
        for (let i = 0; i < allImages.length; i++) {
            EditBackground.setImage(allImages[i]);
        }

        if (dragAndDrop) {
            element.addEventListener('drop', function (e) {
                EditBackground.hide();

                setTimeout(function () {
                    EditBackground.setAllImages(element, false);
                }, 0);
            });
        }
    }

    /**
     * get current image (that user click on it)
     * @return Object (Node)
     */
    static getCurrentImage() {
        var getByClass = document.getElementsByClassName(Config.EditBackground.currentImageClass);
        return getByClass.length > 0 ? getByClass[0] : null;
    }

    /**
     * set current image by adding class to the clicked image
     * @param Object (Node element - the clicked image)
     */
    static setCurrentImage(element) {
        EditBackground.removeCurrentImage();
        element.classList.add(Config.EditBackground.currentImageClass);
    }

    /**
     * remove the current image by removing the class from the image
     */
    static removeCurrentImage() {
        var get = document.getElementsByClassName(Config.EditBackground.currentImageClass);
        for (let i = 0; i < get.length; i++) {
            get[i].classList.remove(Config.EditBackground.currentImageClass)
        }
    }
}