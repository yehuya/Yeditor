import Config from './../../../config.js';
import Selection from './../../Selection.class.js';
import { image as btn } from './btn/image.js';
import Button from './Button.class.js';

/**
 * class for Text edit button
 */
export default class ImageBtn extends Button {
    constructor(){
        super();
        this.Selection = new Selection();
        this.config = Config.button;
        this.btn = btn;
    }

    /**
     * create button elements from array
     * take the object of button and make it as dom element
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
        var elem = Object.element;
        Object.event(elem);

        return elem;
    }

    /**
     * event onClick on button
     * @param Object (button)
     * @param FN (callback function)
     */
    click(button, callback){
        var self = this;

        return super.click(button, function(){
            if(typeof callback == 'function'){
                // check if user selection area is editable
                if(self.Selection.parentEditable()){
                    callback();
                }
            }
        });
    }

    /**
     * add button
     * @param Object
     */
    addButton(object){
        return super.addButton(object, this.btn);
    }
}