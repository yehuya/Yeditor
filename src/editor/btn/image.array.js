import Image from './../image/Image.class.js';
import Base64 from './../image/Base64.js';

const exports = module.exports;

exports.image = [
    /**
     * add image
     */
    {
        name: 'Add image',
        text: 'Add image',
        element: (function(){
            var label = document.createElement('label');
            var input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.style.display = 'none';

            label.appendChild(input);

            return label;
        })(),
        event: [
            {
                name: 'mousedown',
                fn: function(event){
                    event.preventDefault();
                }
            },
            {
                name: 'change',
                fn: function(event){
                    var files = event.target.files || event.dataTransfer.files;
                    Base64.image(files[0], function(url, file){
                        var Img = new Image();
                        Img.insert(url).setAttribute('alt', file.type);
                    });
                }
            }
        ] 
    }
];