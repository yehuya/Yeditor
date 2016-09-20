import Element from './../Element.class.js';
import Config from './../../config.js';

/**
 * serialize data for ajax request
 */
export default class Serialize {
    constructor(){
        var elem = new Element();
        this.elements = elem.all();

        this.config = Config.editable;
        // this.blob = Config.ajax.blob;
    }


    makeBigObject(){
        var object = {};

        this.elements.forEach(function(elem) {
            let type = elem[this.config.typeAttr];
            if(type == 'text'){
                object[elem.name] = elem.content;
            }else if(type == 'image'){
                // if this.blob are TRUE
                // object[name + '<image type>'] = this.blob(elem.content);
            }
        }, this);

        return object;
    }

    /**
     * serialize object for ajax sending
     * @return String
     */
    ajax(){
        var object = this.makeBigObject();
        var data = '';

        for(let key in object){
            let and = data.length > 0 ? '&' : '';
            data += and + encodeURIComponent(key.trim()) + '=' + encodeURIComponent(object[key].trim()); 
        }

        return data;
    }

    /**
     * sending base64 image as binary
     */
    blob(){}
} 