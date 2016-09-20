import Element from './../../../Element.class.js';
import Editable from './../../../Editable.class.js';
import Ajax from './../../../ajax/Ajax.class.js';

const exports = module.exports;

exports.nav = [
    /**
     * edit
     * @CLASS Editable.class.js
     * @FN set()
     */
    {
        name: 'Edit',
        event: function(){
            var editable = new Editable();
            editable.set();
        }
    },
    /**
     * no edit
     * @CLASS Editable.class.js
     * @FN set()
     */
    {
        name: 'No edit',
        event: function(){
            var editable = new Editable();
            editable.unset();
        }
    },
    /**
     * save
     * @CLASS Ajax.class.js, Serialize.class.js 
     * @FN set()
     */
    {
        name: 'Save',
        event: function(){
            var ajax = new Ajax();
            ajax.request();
        }
    }
]