var yeditor = new Yeditor({
    navMainOrder: ['Close nav', ['<span style="opacity: .2;">|</span>'], 'save', 'bold', 'italic', 'underline', ['<span style="opacity: .2;">|</span>'], 'Add image', 'Add background', ['<span style="opacity: .2;">|</span>'], 'add link', 'remove link', ['<span style="opacity: .2;">|</span>'], 'code'],
    openNavigation: false
});

var edit = document.getElementById('edit-home');
edit.editable();
setTimeout(function() {
    edit.focus();
}, 0);