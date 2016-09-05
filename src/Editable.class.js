import Config from './config.js';

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
        this.htmlTag = config.htmlTag;
        this.nameAttribute = config.nameAttribute;
    }
    
    /**
     * get all editable area
     * @return Array 
     */
    get(){
        var allEditArea = document.querySelectorAll(this.htmlTag);
        return allEditArea;
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