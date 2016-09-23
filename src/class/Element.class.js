import Config from './../config.js';

/**
 * all about the Element
 */
export default class Element {
    constructor(){}

    /**
     * create element prototype
     * @param String (prototype.name)
     * @param All (prototype.name = value)
     */
    prototype(key, value){
        window.Element.prototype[key] = value;
    }

    /**
     * get all element with plugin attribute (editable area)
     * @return Array Of Object (element)
     */
    getAll(){
        return document.querySelectorAll('[' + Config.editable.attribute.plugin + ']');
    }
} 