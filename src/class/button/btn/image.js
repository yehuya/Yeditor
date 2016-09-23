import Image from './../../image/Image.class.js';
import Base64 from './../../image/Base64.class.js';
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
            var base64 = new Base64();
            element.addEventListener('mousedown', function(e){e.preventDefault();});
            element.addEventListener('change', function(event){          
                var files = event.target.files || event.dataTransfer.files;
                base64.image(files[0], function(url, file){
                    var Img = new Image();
                    console.log()
                    Img.insert(url).setAttribute('alt', file.type);
                });
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