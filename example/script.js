// the main function of the plugin
var editor = new Yeditor({
    // upload image & background into the server 
    /*uploadImage: function(file, callback){
        $.get('http://localhost').then(function(url){
            callback(url);
        });
    }*/
    // url: 'http://localhost',
    navMainOrder: ['Close nav', ['<span style="opacity: .2;">|</span>'], 'save', 'bold', 'italic', 'underline', 'Add image', 'Add background', 'add link', 'remove link', 'code'],
    openNavigation: true,
    
    done: function (data) {
        console.log(data);
    }
});

// Api - add param to ajax requset
editor.api.ajax.addParam({
    name: 'hello',
    value: 'world'
});

var title = document.getElementsByTagName('h1')[0];
// set area as editable
var edit = title.editable({
    name: 'title'
});

var text = document.getElementsByClassName('col-xs-4');
for (var i = 0; i < text.length - 1; i++) {
    text[i].editable({
        name: 'text-' + i
    });
}
