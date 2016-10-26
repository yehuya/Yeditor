"use strict";

/**
 * default buttons for Edit image navigation
 */

import EditImage from './../../image/EditImage.class.js';
import Images from './../../image/Images.class.js';

const exports = module.exports;

exports.editImage = [
    /**
     * change image src 
     */
    {
        name: 'image src',
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
                    var currentImage = EditImage.getCurrentImage();                 
                    
                    Images.getURL(files[0], function(url){
                        currentImage.src = url;
                        EditImage.show(currentImage);
                    });

                    this.getElementsByTagName('input')[0].value = ''; // clone the input for new image
                }
            }
        ] 
    }
];