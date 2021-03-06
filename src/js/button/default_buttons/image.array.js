"use strict";

/**
 * defalut button for images in Main navigation
 */

import Images from './../../image/Images.class.js';
import Selection from './../../selection/Selection.class.js';

const exports = module.exports;

exports.image = [
    /**
     * add image
     */
    {
        name: 'Add image',
        class: ['fa', 'fa-picture-o'],
        description: 'Add image',
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
                    Images.getURL(files[0], function(url) {
                        Images.insertImageIntoUserSelection(url);
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
        description: 'Add background image',
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

                    var selection = new Selection();
                    var elem = selection.parent();

                    Images.getURL(files[0], function(url) {
                        Images.addBackground(url, elem);
                    });

                    this.getElementsByTagName('input')[0].value = ''; // clone the input for new image
                }
            }
        ]
    }
];