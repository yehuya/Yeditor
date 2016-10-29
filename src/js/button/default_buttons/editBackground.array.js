"use strict";

/**
 * default buttons for Edit background navigation
 */

import EditBackground from './../../image/EditBackground.class.js';
import Images from './../../image/Images.class.js';

const exports = module.exports;

exports.editBackground = [
    /**
     * change background image url 
     */
    {
        name: 'Add background',
        description: 'Change background image',
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

                    Images.getURL(files[0], function(url) {
                        currentBg.style.backgroundImage = 'url(' + url + ')';
                    });

                    this.getElementsByTagName('input')[0].value = ''; // clone the input for new image
                }
            }
        ]
    },
    {
        name: 'remove background',
        description: 'Remove background image',
        class: ['fa', 'fa-times'],
        event: {
            name: 'click',
            fn: function(event) {
                event.preventDefault();
                var ok = confirm('Are you sure?');
                if (!ok) return;

                var currentBg = EditBackground.getCurrentBackground();
                currentBg.style.backgroundImage = '';
            }
        }
    }
];