import Config from './../../../config.js';

/**
 * parent class for text, image, nav
 * @parent
 */
export default class Button {
    /**
     * add button to array
     * @param Object (new button)
     * @param Array (btn array)
     */
    addButton(object, array){
        if(typeof object == 'object'){
            array.push(object);
        }
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
            callback();
        });
    }

    /**
     * create button elements from array
     * take the object of button and make it as dom element
     * @param Array
     * @param Object (this)
     * @return Array
     */
    getAllButtons(array, self){
        var arr = [];
        array.forEach(function(element) {
            arr.push(self.create(element));
        }, self);

        return arr;
    }
}