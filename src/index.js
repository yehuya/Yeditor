import Selection from './class/Selection.class.js';
import Editable from './class/Editable.class.js';
import Editor from './class/editor/Editor.class.js';
import Element from './class/Element.class.js';
import Ajax from './class/ajax/Ajax.class.js';
import Serialize from './class/ajax/Serialize.class.js';

window.selection = new Selection();
window.editable = new Editable();
window.editor = new Editor();
window.element = new Element();
window.ajax = new Ajax();
window.serialize = new Serialize();

// usefull link
// https://html.spec.whatwg.org/multipage/interaction.html#attr-contenteditable
