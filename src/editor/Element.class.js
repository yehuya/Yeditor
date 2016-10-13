import Config from './../config.js';

/**
 * all about the Element
 */
export default class Element {
    constructor() { }

    /**
     * create element prototype
     * @param String (prototype.name)
     * @param All (prototype.name = value)
     */
    prototype(key, value) {
        window.Element.prototype[key] = value;
    }

    /**
     * get all element with plugin attribute (editable area)
     * @return Array Of Object (element)
     */
    getAllEditable() {
        return document.querySelectorAll('[' + Config.editable.attribute.plugin + ']');
    }

    /**
     * get all element children and call fn on each child
     * @param Object (node)
     * @param FN (callback)
     */
    childrenFN(node, FN) {
        var child = node.childNodes;

        child.forEach(function(elem){
            elem.children ? this.children(elem, FN): FN(elem);
        }, this);

        return child.length > 0 ? child : false;
    }

    /**
     * get text inside element and surround it with new element
     * @param Object (Node)
     * @param Number || null (offset start or null for 0)
     * @param Number || null (offset end or null for node.length)
     * @param FN (param: text , take this text and append it in new element)
     * @return Object (Node)
     */
    appendFromTo(node, from, to, FN) {
        let text = node.textContent || '';
        let parent = node.parentElement || null;
        let nextSibling = node.nextSibling;

        if (to == null) to = text.length;
        if (from == null) from = 0;

        let before = text.substring(0, from);
        let main = text.substring(from, to);
        let after = text.substring(to, text.length);

        parent.removeChild(node);
        console.log(FN(main));
        main = main.length > 0 ? FN(main) : null;

        if (before.length > 0) parent.insertBefore(createTextNode(before), nextSibling);
        if (main.length > 0) parent.insertBefore(main, nextSibling);
        if (after.length > 0) parent.insertBefore(createTextNode(after), nextSibling);

        return main;
    }

    /**
     * prevent empty: nextSibling, previousSibling 
     * @param Object (node)
     * @return Object || null 
     */
    preventEmptySibling(sibling) {
        if (sibling.nodeType == 3 && sibling.data && sibling.data.trim().length == 0) return null;
        return sibling;
    }

    /**
     * create text node
     * @param String
     * @return Object
     */
    createTextNode(string) {
        return document.createTextNode(string).cloneNode(true);
    }
} 