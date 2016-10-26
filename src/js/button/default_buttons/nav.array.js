"use strict";

/**
 * defalut button for main functions in Main navigation
 */

import Ajax from './../../ajax/Ajax.class.js';
import Selection from './../../selection/Selection.class.js';
import Config from './../../../config.js';
import Code from './../../Code.js';

const exports = module.exports;

exports.nav = [
    /**
     * save
     * @CLASS Ajax.class.js, Serialize.class.js 
     */
    {
        name: 'save',
        class: ['fa', 'fa-floppy-o'],
        element: function(){
            var btn = document.createElement(Config.button.tagName);

            // hide the button if there is no config.ajax.url
            if(Config.ajax.url == null){
                btn.style.display = 'none';
            }

            return btn;
        },
        align: 'right',
        event: {
            name: 'click',
            fn: function () {
                var ajax = new Ajax();
                ajax.request().done(function (xhr) {
                    console.log('done', xhr);
                });
            }
        }
    },
    /**
     * close main nav
     */
    {
        name: 'Close nav',
        class: ['fa', 'fa-times'],
        align: 'left',
        id: ['closeBTN'],
        event: {
            name: 'click',
            fn: function () {
                var nav = document.getElementById(Config.nav.id);
                nav.classList.add('close');
            }
        }
    },
    /**
     * open main nav
     */
    {
        name: 'Open nav',
        class: ['fa', 'fa-pencil'],
        id: 'openBTN',
        event: [
            {
                name: 'click',
                fn: function () {
                    var nav = document.getElementById(Config.nav.id);
                    var btn = document.getElementById('openBTN');

                    if(!btn.classList.contains('move')){
                        nav.classList.remove('close');
                    }
                }
            },
            {
                name: 'mousedown',
                fn: function(){
                    var btn = document.getElementById('openBTN');

                    var position = function(event){
                        btn.classList.add('move');
                        btn.style.top = parseInt(event.pageY) - 35 + 'px';
                        btn.style.left = parseInt(event.pageX) - 35 + 'px';
                    }

                    window.addEventListener('mousemove', position);
                    window.addEventListener('mouseup', function(){
                        // prevent nav opening (by the click event)
                        setTimeout(function(){
                            btn.classList.remove('move')
                        },0);

                        window.removeEventListener('mousemove', position);
                    });
                }
            }
        ]
    },
    /**
     * code 
     * @use editor/Code.js (CodeMirror)
     */
    {
        name: 'code',
        class: ['fa', 'fa-code'],
        event: {
            name: 'click',
            fn: function () {
                let selection = new Selection();
                let parent = selection.parentEditable();

                Code.toggleShow();
                Code.CodeMirror.off('change', Code.EventFn.change);

                Code.EventFn.change = function () {
                    parent.innerHTML = Code.CodeMirror.doc.getValue();
                }

                if (parent) {
                    Code.CodeMirror.focus();
                    Code.CodeMirror.doc.setValue(parent.innerHTML);
                    Code.CodeMirror.on('change', Code.EventFn.change);
                }
            }
        }
    }
]