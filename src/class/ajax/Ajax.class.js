import Config from './../../config.js';
import Serialize from './Serialize.class.js';

/**
 * class for ajax request
 */
export default class Ajax {
    constructor() {
        this.config = Config.ajax;
        this.xhr;
        this.Serialize = new Serialize();
    }

    /**
     * add header
     * @param Array (example: ['Content-Type', 'application/x-www-form-urlencoded'])
     */
    addHeader(arr) {
        this.config.header[arr[0]] = arr[1];
    }

    addData(key, value){
        this.Serialize.addData(key, value);
    }

    /**
     * create ajax request
     * - onreadystatechange | done
     * - onload | success
     * - onerror | failed
     * @callback Object (ajax object - xhr)
     * @return Object (xhr)
     */
    request() {
        var self = this;
        var method = self.config.method;
        this.xhr = new XMLHttpRequest();

        // done
        this.xhr.onreadystatechange = function () {
            if (self.xhr.readyState == 4) {
                if (typeof self.config.done == 'function') {
                    self.config.done(self.xhr);
                }
            }
        }

        // success
        this.xhr.onload = function () {
            if (typeof self.config.success == 'function') {
                self.config.success(self.xhr);
            }
        }

        // failed
        this.xhr.onerror = function () {
            if (typeof self.config.failed == 'function') {
                self.config.failed(self.xhr);
            }
        }

        // open request
        if(method == 'GET'){
            this.xhr.open(method, self.config.url + '?' + this.Serialize.GET(), true);
            this.addHeader({"Content-Type": "application/x-www-form-urlencoded"});
        }else if(method == 'POST'){
            this.xhr.open(method, self.config.url, true);
            this.addHeader({"Content-Type": "multipart/form-data"});
        }
        
        // headers
        for(var head in this.config.header){
            this.xhr.setRequestHeader(head, this.config.header[head]);
        }

        // send
        if(method == 'GET'){
            this.xhr.send();
        }else if(method == 'POST'){
            this.xhr.send(this.Serialize.POST());
        }
        
        return this.xhr;
    }

}