import Selection from '../Selection.class.js';

const selection = new Selection();
const exports = module.exports;

exports.text = [
    /**
     * bold
     * @DOM span
     * @CSS font-weight="bold"
     */
    {
        name: 'bold',
        text: 'B',
        event: {
            name: 'click',
            fn: function(){
                // var element = document.createElement('span');
                // element.style.fontWeight = 'bold';
                // selection.append(element.cloneNode());
                document.execCommand('bold', false);
            }
        }
    },
    /**
     * italic
     * @DOM span
     * @CSS font-style="italic"
     */
    {
        name: 'italic',
        text: 'I',
        event: {
            name: 'click',
            fn: function(){
                // var element = document.createElement('span');
                // element.style.fontStyle = 'italic';

                // selection.append(element.cloneNode());
                document.execCommand('italic', false);
            }
        }
    },
    /**
     * underline
     * @DOM span
     * @CSS text-decoration="underline"
     */
    {
        name: 'underline',
        text: 'U',
        event: {
            name: 'click',
            fn: function(){
                // var element = document.createElement('span');
                // element.style.textDecoration = 'underline';

                // selection.append(element.cloneNode());
                document.execCommand('underline', false);
            }
        }
    }
];

