import Config from './../../../config.js';
import { nav as btn } from './btn/nav.js';
import Button from './Button.class.js';

/**
 * class for main nav button
 */
export default class NavBtn extends Button {
    constructor(){
        super();
        this.btn = btn;
        this.config = Config.button;
    }

    /**
     * create button elements from array
     * take the object of button and make it as dom element
     * @param Array
     * @return Array
     */
    getAllButtons(){
        return super.getAllButtons(this.btn, this);
    }

    /**
     * create button from btn object
     * get btn object form this.btn and make it as DOM element
     * @param Object (btn object)
     * @return Object (DOM element)
     */
    create(Object){
        var self = this;
        var name = Object.name || '?';

        var elem = document.createElement('button');
        elem.classList.add(this.config.btnClass);
        elem.title = name;
        elem.innerText = name;

        this.click(elem, function(){
            Object.event();
        });

        return elem;
    }

    /**
     * event onClick on button
     * @param Object (button)
     * @param FN (callback function)
     */
    click(button, callback){
        return super.click(button, callback);
    }

    /**
     * add button
     * @param Object
     */
    addButton(object){
        return super.addButton(object, this.btn);
    }
}