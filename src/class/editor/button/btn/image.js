import Selection from './../../../Selection.class.js';
const exports = module.exports;

exports.image = [
    /**
     * add image
     */
    {
        btn: function(){
            var elem = this.dom();
            this.event(elem);

            return elem;
        },
        event: function(element){
            var selection = new Selection();
            element.addEventListener('mousedown', function(e){e.preventDefault();});
            element.addEventListener('change', function(event){          
                var files = event.target.files || event.dataTransfer.files;
                var reader = new FileReader();

                for(var i = 0, f; f = files[i]; i++) {
                    reader.onload = (function(file){
                        return function(event){
                            var result = event.target.result;
                            var img = new Image();
                            img.src = result;
                            console.log(img);
                            selection.append(img);
                        }
                    })(files[i]);

                    reader.readAsDataURL(files[i]);
                }
            });
        },
        dom: function(){
            var label = document.createElement('label');
            var span = document.createElement('span');
            span.innerText = 'IMAGE';
            var input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.style.display = 'none';

            label.appendChild(span);
            label.appendChild(input);

            return label.cloneNode(true);
        }
    }
];