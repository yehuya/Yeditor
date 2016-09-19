import Selection from './text/Selection.class.js';
import Editable from './Editable.class.js';
import Editor from './editor/Editor.class.js';
import Element from './element/Element.class.js';
import Ajax from './ajax/Ajax.class.js';
import Serialize from './ajax/Serialize.class.js';

window.selection = new Selection();
window.editable = new Editable();
window.editor = new Editor();
window.element = new Element();
window.ajax = new Ajax();
window.serialize = new Serialize();

// usefull link
// https://html.spec.whatwg.org/multipage/interaction.html#attr-contenteditable
