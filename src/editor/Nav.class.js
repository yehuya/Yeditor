import Config from './../config.js';
import Button from './Button.class.js';

export default class Nav {

    /**
     * __construct
     * create navigation
     */
    constructor(){
        this.config = Config.nav;
        this.Button = new Button();
        this.createTextNav();
        this.createImageNav();
    }

    /**
     * create navigation element (DOM)
     * @param String (nav id)
     * @return Object
     */
    element(navId){
        var elem = document.createElement('nav');
        elem.id = navId;
        elem.classList.add(this.config.navClass);

        return elem.cloneNode();
    }

    /**
     * append DOM element into the document.body
     * @param Object (DOM element)
     */
    appendToDocument(Node){
        document.body.appendChild(Node);
    }

    /**
     * append DOM element into the nav 
     * @param Object (nav element)
     * @param Object (DOM element)
     */
    appendToNav(nav, Node){
        nav.appendChild(Node);
    }

    /**
     * append edit button into nav
     * @param Object (nav element)
     * @param Array (buttons)
     */
    appendEditButtons(nav, buttons){
        var self = this;
        buttons.forEach(function(element) {
            self.appendToNav(nav, element);
        });
    }

    /**
     * create navigation
     * @param String (nav id)
     * @param Array (buttons element)
     * - create nav
     * - append edit button into nav
     * - append nav into body
     */
    create(navId, buttons){
        var nav = this.element(navId);

        this.appendEditButtons(nav, buttons);
        this.appendToDocument(nav);
    }

    /**
     * create navigation for text area
     */
    createTextNav(){
        var buttons = this.Button.btnTextElement;
        var navId = this.config.navTextId;
        this.create(navId, buttons);  
    }

    /**
     * create navigation for image area
     */
    createImageNav(){
        var buttons = this.Button.btnImageElement;
        var navId = this.config.navImageId;        
        this.create(navId, buttons);  
    }
}