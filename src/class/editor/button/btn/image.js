const exports = module.exports;

exports.image = [
    {
        name: 'Add image',
        node: function(){
            var element = document.createElement('img');
            element.src = 'http://localhost/~yehuda/plugins/frontend-editor/test/images/tmp.jpg';

            return element.cloneNode();
        }
    }
];