import Config from './../config.js';
import Button from './button/Button.class.js';

export default class Navigation {

    /**
     * __construct
     * create navigation
     */
    constructor(buttons, id){
        this.config = Config.nav;
        this.buttons = buttons; 
        this.id = id;
        this.nav;

        this.create();
    }

    /**
     * create navigation element (DOM)
     * @return Object
     */
    element(){
        this.nav = document.createElement('nav');
        this.nav.id = this.id;
        this.nav.classList.add(this.config.class);

        return this.nav;
    }

    /**
     * insert nav element into the document.body
     * @param Object (DOM element)
     */
    insertIntoBody(){
        return document.body.appendChild(this.nav);
    }

    /**
     * append DOM element into the nav 
     * @param Object (nav element)
     * @param Object (DOM element)
     */
    append(Node){
        return this.nav.appendChild(Node);
    }

    /**
     * insert edit button into nav
     * @param Object (nav element)
     * @param Array (buttons)
     */
    insertEditButtons(){
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
    create(){
        this.element();
        this.insertEditButtons();
        this.insertIntoBody();
    }

    /**
     * add button into the navigation
     * @param Object
     */
    addButton(object){
        var btn = new Button(object);
        this.append(btn);
    }
}