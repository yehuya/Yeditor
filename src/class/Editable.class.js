import Config from './../config.js';
import Element from './Element.class.js';

/**
 * get all the editable area
 */
export default class Editable {
    
    /**
     * __construct
     * set param from config file
     */
    constructor(){
        var config = Config.editable;
        this.Element = new Element();
    }
    
    /**
     * get all editable area
     * @extends from 'element/Element.class.js'
     * @return Array 
     */
    get(){
        return this.Element.get();
    }

    /**
     * set 'editable area' as editable
     */
    set(){
        var allEditArea = this.get();
        allEditArea.forEach(function(element) {
            element.setAttribute('contenteditable', 'true');
        }, this);
    }

    /**
     * unset 'editable area' as editable 
     */
    unset(){
        var allEditArea = this.get();
        allEditArea.forEach(function(element) {
            element.removeAttribute('contenteditable');
        }, this);
    }
}