import Config from './../../config.js';

/**
 * serialize data for ajax request
 */
export default class Serialize {
    constructor(){
        this.FromData = new FormData(); // for POST method
        this.StringData = ''; // for GET method
        this.config = Config.editable;
        this.method = Config.ajax.method;
    }

    /**
     * serialize array of elements for POST ajax method
     * @param Array of Object (elements)
     * @return Object
     */
    POST(ArrayOfElements){
        this.convert(ArrayOfElements)
        return this.FromData;
    }

    /**
     * serialize array of elements for GET
     * @param Array of Object (elements)
     * @return String
     */
    GET(ArrayOfElements){
        this.convert(ArrayOfElements)
        return this.StringData;
    }

    /**
     * create object from all the editable elements
     * @param Array of Object
     * @structure: {element.name : element.content}
     */
    makeBigObject(ArrayOfElements){
        var object = {};

        ArrayOfElements.forEach(function(elem) {
            object[elem.getAttribute(this.config.attribute.name)] = elem.innerHTML;
        }, this);

        return object;
    }

    /**
     * convert this.makeBigObject into ajax request by this.addData
     * @param Array of Object
     */
    convert(ArrayOfElements){
        var object = this.makeBigObject(ArrayOfElements);
        for(let key in object){
            this.addData(key, object[key]);
        }
    }

    /**
     * add key = value into this.data 
     * for GET | POST method
     * @param String (key)
     * @param String (value)
     */
    addData(key, value){
        if(this.method == 'GET'){
            let and = this.StringData.length > 0 ? '&' : '';
            this.StringData += encodeURIComponent(key.trim()) + '=' + encodeURIComponent(value.trim());
        }else if(this.method == 'POST'){
            this.FromData.append(key, value);
        }
    }
} 