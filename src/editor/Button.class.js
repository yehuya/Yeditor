import Config from './../config.js';
import btn from './button.js';

/**
 * editor button class
 */
export default class Button {
    constructor(){
        this.btn_image = btn.image;
        this.btn_text = btn.text;
    }

    /**
     * event onClick on button
     * @param Object (button)
     * @Param FN (callback function)
     */
    click(button, callback){
        button.addEventListener('click', function(e){
            e.preventDefault();
            if(typeof callback == 'function'){
                callback();
            }
        });
    }

    /**
     * add image button
     * @param Object
     */
    addImageButton(Object){
        if(typeof Object == 'object'){
            this.btn_image.push(Object);
        }
    }

    /**
     * add text button
     * @param Object
     */
    addTextButton(Object){
        if(typeof Object == 'object'){
            this.btn_text.push(Object);
        }
    }
}