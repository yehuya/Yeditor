import Img from './../image/Image.js';

const exports = module.exports;

exports.image = [
    /**
     * add image
     */
    {
        name: 'Add image',
        class: ['fa', 'fa-picture-o'],
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
                    Img.imageUrl(files[0], function(url){
                        Img.insertImage(url);
                    });

                    this.getElementsByTagName('input')[0].value = ''; // clone the input for new image
                }
            }
        ] 
    },
    /**
     * add background  
     */
    {
        name: 'Add background',
        class: ['fa', 'fa-file-image-o'],
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
                    Img.imageUrl(files[0], function(url){
                        Img.insertBackground(url);
                    });

                    this.getElementsByTagName('input')[0].value = ''; // clone the input for new image
                }
            }
        ] 
    }
];