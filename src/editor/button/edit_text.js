const exports = module.exports;

exports.text = [
    /**
     * bold
     * @DOM span
     * @CSS font-weight="bold"
     */
    {
        name: 'bold',
        node: function(){
            var element = document.createElement('span');
            element.style.fontWeight = 'bold';

            return element.cloneNode();
        }
    },
    /**
     * italic
     * @DOM span
     * @CSS font-style="italic"
     */
    {
        name: 'italic',
        node: function(){
            var element = document.createElement('span');
            element.style.fontStyle = 'italic';

            return element.cloneNode();
        }
    },
    /**
     * underline
     * @DOM span
     * @CSS text-decoration="underline"
     */
    {
        name: 'underline',
        node: function(){
            var element = document.createElement('span');
            element.style.textDecoration = 'underline';

            return element.cloneNode();
        }
    }
];

