const Selection = require('./text/Selection.class.js').default;
const Editable = require('./Editable.class.js').default;
const Editor = require('./editor/Editor.class.js').default;

window.selection = new Selection();
window.editable = new Editable();
window.editor = new Editor();

