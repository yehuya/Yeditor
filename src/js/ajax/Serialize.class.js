"use strict";

/**
 * serialize data for ajax request
 */

import Config from './../../config.js';

export default class Serialize {
    /**
     * __construct
     * serialize DOM elements
     * for ajax sending
     * @param Array (of HTML elements)
     */
    constructor(ArrayOfElements){
        this.FromData = new FormData(); // for POST method
        this.StringData = ''; // for GET method
        
        this.config = Config.editable;
        this.convert(ArrayOfElements);
    }

    /**
     * get serialize array of elements for POST ajax method
     * @return Object (FormData)
     */
    POST(){
        return this.FromData;
    }

    /**
     * get serialize array of elements for GET
     * @return String
     */
    GET(){
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
        // GET
        let and = this.StringData.length > 0 ? '&' : '';
        this.StringData += encodeURIComponent(key.trim()) + '=' + encodeURIComponent(value.trim());
        
        // POST
        this.FromData.append(key, value);
    }
} 