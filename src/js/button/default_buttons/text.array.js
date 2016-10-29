"use strict";

/**
 * defalut button for text in Main navigation
 */

import Selection from './../../selection/Selection.class.js';

const exports = module.exports;

exports.text = [
    /**
     * bold
     * @DOM span
     * @CSS font-weight="bold"
     */
    {
        name: 'bold',
        class: ['fa', 'fa-bold'],
        description: 'Bold',
        event: {
            name: 'click',
            fn: function() {
                var bold = function(text) {
                    var b = document.createElement('span');
                    b.style.fontWeight = 'bold';

                    text = document.createTextNode(text).cloneNode(true);
                    b.appendChild(text);

                    return b.cloneNode(true);
                }

                var unbold = function(text) {
                    var b = document.createElement('span');
                    b.style.fontWeight = 'normal';

                    text = document.createTextNode(text).cloneNode(true);
                    b.appendChild(text);

                    return b.cloneNode(true);
                }

                var selection = new Selection();

                var parent = selection.parent();
                if (parent && parent.style.fontWeight == 'bold') {
                    if (parent.textContent.trim() == selection.text().trim()) return parent.style.fontWeight = 'normal';
                    return selection.append(unbold);
                }
                selection.append(bold);
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
        description: 'Italic',
        class: ['fa', 'fa-italic'],
        event: {
            name: 'click',
            fn: function() {
                var italic = function(text) {
                    var i = document.createElement('span');
                    i.style.fontStyle = 'italic';

                    text = document.createTextNode(text).cloneNode(true);
                    i.appendChild(text);

                    return i.cloneNode(true);
                }

                var unitalic = function(text) {
                    var i = document.createElement('span');
                    i.style.fontStyle = 'normal';

                    text = document.createTextNode(text).cloneNode(true);
                    i.appendChild(text);

                    return i.cloneNode(true);
                }

                var selection = new Selection();

                var parent = selection.parent();
                if (parent && parent.style.fontStyle == 'italic') {
                    if (parent.textContent.trim() == selection.text().trim()) return parent.style.fontStyle = 'normal';
                    return selection.append(unitalic);
                }
                selection.append(italic);
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
        description: 'Underline',
        class: ['fa', 'fa-underline'],
        event: {
            name: 'click',
            fn: function() {
                var underline = function(text) {
                    var u = document.createElement('span');
                    u.style.textDecoration = 'underline';

                    text = document.createTextNode(text).cloneNode(true);
                    u.appendChild(text);

                    return u.cloneNode(true);
                }

                var ununderline = function(text) {
                    var u = document.createElement('span');
                    u.style.textDecoration = 'none';

                    text = document.createTextNode(text).cloneNode(true);
                    u.appendChild(text);

                    return u.cloneNode(true);
                }

                var selection = new Selection();

                var parent = selection.parent();
                if (parent && parent.style.textDecoration == 'underline') {
                    if (parent.textContent.trim() == selection.text().trim()) return parent.style.textDecoration = 'none';
                    return selection.append(ununderline);
                }

                selection.append(underline);
            }
        }
    },
    {
        name: 'add link',
        description: 'Add link',
        class: ['fa', 'fa-link'],
        event: [{
            name: 'click',
            fn: function(e) {

                var selection = new Selection();
                var text = selection.text();
                if (!selection.selected.isCollapsed && selection.parentEditable()) {

                    var url = prompt('Add link url..', 'http://');

                    var link = document.createElement('a');
                    link.href = url;

                    var get = selection.remove();
                    link.appendChild(get);
                    selection.insert(link);
                }
            }
        }]
    },
    {
        name: 'remove link',
        description: 'Remove links',
        class: ['fa', 'fa-chain-broken'],
        event: [{
            name: 'click',
            fn: function(e) {
                var selection = new Selection();

                if (!selection.selected.isCollapsed && selection.parentEditable()) {

                    var get = selection.remove();
                    var links = get.querySelectorAll('a');

                    links.forEach(link => {
                        var parent = link.parentElement || get;
                        var content = document.createTextNode(link.textContent);
                        parent.insertBefore(content, link);
                        parent.removeChild(link);
                    });

                    selection.insert(get);
                }
            }
        }]
    }

];