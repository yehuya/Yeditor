import Config from './../config.js';
import { image as btn_image } from './btn/image.array.js';
import { nav as btn_nav } from './btn/nav.array.js';
import { text as btn_text } from './btn/text.array.js';

export default class Button {
    constructor(){
        this.config = Config.button;
        this.btn = [].concat(btn_image, btn_nav, btn_text);
    }

    /**
     * get all button elements
     * @return Array of Object
     */
    get(){
        var arr = [];
        this.btn.forEach(function(button){
            arr.push(this.create(button));
        }, this);

        return arr;
    }

    /**
     * create btn from object 
     * @property name, description, class, text, id, element, event 
     * @param Object
     * @return Object
     */
    create(btn){
        var element = typeof btn.element == 'object' ? btn.element : this.element(); 
        element.classList.add(this.config.class + (btn.class || ''));
        element.title = btn.description || '';
        element.id = btn.id || '';
        if(btn.text && btn.text.length > 0) element.appendChild(document.createTextNode(btn.text));

        this.event(btn.event, element);

        return element;
    }

    /**
     * default button element
     * @return Object (dom element)
     */
    element(){
        return document.createElement(this.config.tagName).cloneNode();
    }

    /**
     * create button events
     * @param Array of Object || Object (events)
     * @param Object (dom element)
     */
    event(events, element){
        if(Array.isArray(events)){
            events.forEach(function(event){
                element.addEventListener(event.name, event.fn);
            }, this);
        }else{
            element.addEventListener(events.name, events.fn);
        }
    }
}

/* ## EXAMPLE of button object
{
    name: 'test', // btn name
    description: 'test btn', // btn description - for title tag - optional
    class: 'test-btn', // add class to this btn - optional
    text: 'test', // insert text into the btn - optional
    id: 'test-btn', // add id to this btn - optional
    element: document.createElement('button').cloneNode(), // btn element - optional
    event: [
        {
            name: 'click',
            fn: function(){
                console.log('test');
            }
        }
    ],// btn event || for multiple event use []
}
*/