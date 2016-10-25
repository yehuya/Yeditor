"use strict";

/**
 * array of button for image editing navigation
 */

import EditBackground from './../image/EditBackground.class.js';
import Img from './../image/Image.js';

const exports = module.exports;

exports.editBackground = [
    /**
     * change background image url 
     */
    {
        name: 'Add background',
        class: ['fa', 'fa-file-image-o'],
        element: (function() {
            var label = document.createElement('label');
            var input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.style.display = 'none';

            label.appendChild(input);

            return label;
        })(),
        event: [{
                name: 'mousedown',
                fn: function(event) {
                    event.preventDefault();
                }
            },
            {
                name: 'change',
                fn: function(event) {
                    var files = event.target.files || event.dataTransfer.files;
                    var currentBg = EditBackground.getCurrentBackground();

                    Img.imageUrl(files[0], function(url) {
                        currentBg.style.backgroundImage = 'url(' + url + ')';
                    });

                    this.getElementsByTagName('input')[0].value = ''; // clone the input for new image
                }
            }
        ]
    }
];