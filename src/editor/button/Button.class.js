import Config from './../../config.js';

/**
 * Create button element from object
 * @example button object 
 * {
 *   @name: 'test', // btn name
 *   @description: 'test btn', // btn description - for title tag - optional
 *   @class: 'test-btn', // [] for multiple,  add class to this btn - optional
 *   @text: 'test', // insert text into the btn - optional
 *   @id: 'test-btn', // add id to this btn - optional
 *   @element: document.createElement('button').cloneNode(), // btn element - optional
 *   @event: [
 *             {
 *                 @name: 'click',
 *                 @fn: function(){
 *                     console.log('test');
 *                 }
 *             }
 *         ],// btn event || for multiple event use []
 * }
 */

export default class Button {

    /**
     * __construct
     * @param Object (button)
     * @return Object (Node element)
     */
    constructor(btn) {
        this.config = Config.button;

        return this.create(btn);
    }

    /**
     * create btn from object 
     * @param Object
     * @property name, description, class, text, id, element, event 
     * @return Object
     */
    create(btn) {
        this.element = typeof btn.element == 'object' ? btn.element : this.element();
        
        this.class(btn.class);

        this.element.title = btn.description || '';
        this.element.id = btn.id || '';
        if (btn.text && btn.text.length > 0) this.element.appendChild(document.createTextNode(btn.text));

        this.event(btn.event);

        return this.element;
    }

    /**
     * default button element
     * @return Object (dom element)
     */
    element() {
        return document.createElement(this.config.tagName).cloneNode();
    }

    /**
     * add class to btn element
     * @param String || Array
     */
    class(classes) {
        this.element.classList.add(this.config.class);

        if(Array.isArray(classes)){
            classes.forEach(function(cla){
                this.element.classList.add(cla);
            }, this);
        }else if(classes){
            this.element.classList.add(classes);
        }
    }


    /**
     * create button events
     * @param Array of Object || Object (events)
     * @param Object (dom element)
     */
    event(events) {
        if (Array.isArray(events)) {
            events.forEach(function (event) {
                this.element.addEventListener(event.name, event.fn);
            }, this);
        } else {
            this.element.addEventListener(events.name, events.fn);
        }
    }
}
