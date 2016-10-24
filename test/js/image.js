var _NAV;
var _BTN_SOURCE;

// # nav
// create edit image - navigation
function createNav() {
    _NAV = document.createElement('nav');
    _NAV.id = 'image-nav';
    _NAV.style.display = 'none';
    _NAV.style.position = 'absolute';

    _BTN_SOURCE = document.createElement('button');
    _BTN_SOURCE.innerText = 'get image src';

    _NAV.appendChild(_BTN_SOURCE);

    document.body.appendChild(_NAV);
}

// # event
// add event to all the images in the document
function clickOnImage() {
    var images = document.getElementsByTagName('img');

    for (img of images) {
        img.addEventListener('click', function(event) {
            event.stopPropagation();

            showNav(this);
            navButtonClickEvent(this);
        });
    }
}

// # show & position nav
// show nav when image clicked
// put the nav on the image
// @param Object (clicked element)
function showNav(Node) {
    var position = Node.getBoundingClientRect();

    _NAV.style.display = 'block';
    _NAV.style.left = position.left;
    _NAV.style.top = position.top;
}

function hideNav() {
    window.onclick = function() {
        _NAV.style.display = 'none';
    }
}

// # nav button event
// the function of the nav button
function navButtonClickEvent(Node) {
    _BTN_SOURCE.onclick = function() {
        console.log(Node.src);
    }
}

function clickOnBackgroundImage() {
    var elements = document.getElementsByTagName('*');
    console.log(elements);
    for (elem of elements) {
        elem.onclick = function(event) {
            event.stopPropagation();
            var bg = this.style.backgroundImage;
            console.log(bg);
        }
    }
}

createNav();
hideNav();
clickOnImage();
clickOnBackgroundImage();