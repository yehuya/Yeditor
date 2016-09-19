import Config from './../config.js';

/**
 * get all editable elements
 */
export default class Element {
    constructor(){
        this.config = Config.editable;
    }

    /**
     * get all editable elements
     * @return Array of Object (Node)
     */
    get(){
        var TAG = this.config.htmlTag;
        return document.querySelectorAll(TAG);
    }

    /**
     * return object of the element with:
     * - name
     * - type
     * - html
     * @param Object
     * return Object
     */
    serialize(elem){
        return {
            name: this.name(elem),
            type: this.type(elem),
            html: this.innerHTML(elem)
        }
    }

    /**
     * get element inner html
     * @param Object (Node)
     * @return String
     */
    innerHTML(elem){
        return elem.innerHTML;
    }

    /**
     * get element name
     * @param Object (Node)
     * @return String
     */
    name(elem){
        var name = this.config.nameAttr;
        return elem.getAttribute(name);
    }

    /**
     * get element type
     * @param Object (Node)
     * @return String
     */
    type(elem){
        var type = this.config.typeAttr;
        return elem.getAttribute(type);
    }
} 