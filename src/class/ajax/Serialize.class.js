import Element from './../Element.class.js';
import Config from './../../config.js';

/**
 * serialize data for ajax request
 */
export default class Serialize {
    constructor(){
        var elem = new Element();
        this.elements = elem.all();
        this.FromData = new FormData(); // for POST method
        this.StringData = ''; // for GET method
        this.config = Config.editable;
        this.method = Config.ajax.method;
        // this.blob = Config.ajax.blob;
    }

    /**
     * serialize object for POST ajax method
     * @return Object
     */
    POST(){
        this.convert()
        return this.FromData;
    }

    /**
     * serialize object for GET
     * @return String
     */
    GET(){
        this.convert()
        return this.StringData;
    }

    /**
     * create object from all the editable elements
     * make base64 image as blob (check by type of the element)
     * @structure: {element.name : element.content}
     */
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
     * convert this.makeBigObject into ajax request by this.addData
     */
    convert(){
        var object = this.makeBigObject();
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

    /**
     * sending base64 image as binary
     */
    blob(){}
} 