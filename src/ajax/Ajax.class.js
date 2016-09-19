import Config from './../config.js';
import Serialize from './Serialize.class.js';

/**
 * class for ajax request
 */
export default class Ajax {
    constructor() {
        this.config = Config.ajax;
        this.xhr;
    }

    /**
     * add header
     * @param Array (example: ['Content-Type', 'application/x-www-form-urlencoded'])
     */
    addHeader(arr) {
        this.config.header[arr[0]] = arr[1];
    }

    /**
     * create ajax request
     * - onreadystatechange | done
     * - onload | success
     * - onerror | failed
     * @param String (data for send)
     * @callback Object (ajax object - xhr)
     * @return Object (xhr)
     */
    request(data) {
        var self = this;
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

        this.xhr.open(self.config.method, self.config.url, true);
        
        for(var head in this.config.header){
            this.xhr.setRequestHeader(head, this.config.header[head]);
        }

        this.xhr.send();
        return this.xhr;
    }

}