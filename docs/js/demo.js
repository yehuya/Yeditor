var yeditor = new Yeditor({
    navMainOrder: ['Close nav', ['<span style="opacity: .2;">|</span>'], 'save', ['<span style="opacity: .2;">|</span>'], 'bold', 'italic', 'underline', ['<span style="opacity: .2;">|</span>'], 'Add image', 'Add background', ['<span style="opacity: .2;">|</span>'], 'add link', 'remove link', ['<span style="opacity: .2;">|</span>'], 'code'],
    openNavigation: true,
    url: 'http://httpbin.org/post',
    method: 'POST'
});

var editable = document.getElementsByClassName('col-md-4');
for(var i = 0 ; i < editable.length ; i++){
    editable[i].editable({
        name: "editable-" + i
    });
}