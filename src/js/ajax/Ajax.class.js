"use strict";

/**
 * class for ajax request
 */

import Config from './../../config.js';
import Serialize from './Serialize.class.js';
import Editable from './../Editable.class.js';

export default class Ajax {
    /**
     * __consturct
     * init public vars
     */
    constructor() {
        this.config = Config.ajax;
        this.xhr;
        this.Serialize;
    }

    /**
     * add header
     * @param Array (example: ['Content-Type', 'application/x-www-form-urlencoded'])
     */
    addHeader(arr) {
        this.config.header[arr[0]] = arr[1];
    }

    /**
     * set ajax request header
     * setRequestHeader
     */
    header() {
        for (let head in this.config.header) {
            this.xhr.setRequestHeader(head, this.config.header[head]);
        }
    }

    /**
     * add data to ajax request
     * the data added into arr in config.ajax
     * before ajax request send it added into the request
     * @param Object 
     * @example {name: 'hello', value: 'world'}
     */
    static addParam(obj) {
        if(typeof obj == 'object' && obj.hasOwnProperty('name') && obj.hasOwnProperty('value')){
            Config.ajax.param.push(obj);
        }
    }

    /**
     * add additional params into the request
     */
    param(){
        var param = this.config.param;
        param.forEach(function(p) {
            this.addData(p.name, p.value);
        }, this);
    }


    /**
     * add data to request 
     * @param String
     * @param String
     */
    addData(key, value) {
        this.Serialize.addData(key, value);
    }

    /**
     * callback function when ajax request success (onload)
     * @param FN (callback)
     * @return Object (this)
     */
    success(callback) {
        this.xhr.onload = callback(this.xhr);
        return this;
    }

    /**
     * callback function when ajax request failed (onerror)
     * @param FN (callback)
     * @return Object (this)
     */
    error(callback) {
        this.xhr.onerror = callback(this.xhr);
        return this;
    }

    /**
     * callback function when ajax request done (readyState == 4)
     * @param FN (callback)
     * @return Object (this)
     */
    done(callback) {
        var self = this;
        this.xhr.onreadystatechange = function () {
            if (self.xhr.readyState == 4) {
                callback(self.xhr);
            }
        }
        return this;
    }

    /**
     * create ajax request
     * - get editable element data
     * - serialize data
     * @callback Object (ajax object - xhr)
     * @return Object (this)
     */
    request() {
        var self = this;
        var elements = Editable.getAllEditableElement();
        this.Serialize = new Serialize(elements);

        var method = self.config.method;
        this.xhr = new XMLHttpRequest();

        // open request
        if (method == 'GET') {
            this.xhr.open(method, self.config.url + '?' + this.Serialize.GET(), true);
            this.addHeader(["Content-Type", "application/x-www-form-urlencoded"]);
        } else if (method == 'POST') {
            this.xhr.open(method, self.config.url, true);
            this.addHeader(["Content-Type", "multipart/form-data"]);
        }

        // headers
        this.header();

        // additional params
        this.param();

        // send
        if (method == 'GET') {
            this.xhr.send();
        } else if (method == 'POST') {
            this.xhr.send(this.Serialize.POST());
        }

        return this;
    }
}