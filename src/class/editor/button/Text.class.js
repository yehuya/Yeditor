import Config from './../../../config.js';
import Selection from './../../Selection.class.js';
import { text as btnText } from './btn/text.js';

/**
 * class for Text edit button
 */
export default class Text {
    constructor(){
        this.Selection = new Selection();
        this.config = Config.button;
        this.btn = btnText;
    }

    /**
     * create button elements from array
     * take the object of button and make it as dom element
     * @param Array
     * @return Array
     */
    getAllButtons(){
        var arr = [];
        this.btn.forEach(function(element) {
            arr.push(this.create(element));
        }, this);

        return arr;
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
     * event onClick on button
     * @param Object (button)
     * @param FN (callback function)
     */
    click(button, callback){
        var self = this;
        button.addEventListener('click', function(e){
            e.preventDefault();
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
        if(typeof object == 'object'){
            this.btn.push(object);
        }
    }
}