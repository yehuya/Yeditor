import Config from './../config.js';
import btn from './button.js';
import Selection from './../text/Selection.class.js';

/**
 * editor button class
 */
export default class Button {
    constructor(){
        this.Selection = new Selection();
        this.config = Config.button;
        this.btn_image = btn.image;
        this.btn_text = btn.text;
        this.btnTextElement = this.createFromArray(this.btn_text);
        this.btnImageElement = this.createFromArray(this.btn_image);
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
     * create button from btn object
     * get btn object form btn.[image|text] and make it as DOM element
     * @param Object (btn object)
     * @return Object (DOM element)
     */
    create(Object){
        var self = this;
        var name = Object.name || '?';
        var node = Object.node() || null;

        var elem = document.createElement('button');
        elem.classList.add(this.config.btnClass);
        elem.title = name;
        elem.innerText = name;

        this.click(elem, function(){
            self.Selection.append(node);
        });

        return elem;
    }

    /**
     * create elements from array
     * take the object of button and make it as dom element
     * @param Array
     * @return Array
     */
    createFromArray(array){
        var self = this;
        var newArray = [];
        array.forEach(function(element) {
            newArray.push(self.create(element));
        });

        return newArray;
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