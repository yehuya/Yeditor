import Ajax from './../ajax/Ajax.class.js';

const exports = module.exports;

exports.nav = [
    /**
     * save
     * @CLASS Ajax.class.js, Serialize.class.js 
     * @FN set()
     */
    {
        name: 'save',
        text: 'Save',
        event: {
            name: 'click',
            fn: function(){
                var ajax = new Ajax();
                ajax.request().done(function(xhr){
                    console.log('done', xhr);
                });
            }
        }
    }
]