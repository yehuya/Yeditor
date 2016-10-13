/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _EditorClass = __webpack_require__(1);

	var _EditorClass2 = _interopRequireDefault(_EditorClass);

	var _SelectionTest = __webpack_require__(15);

	var _SelectionTest2 = _interopRequireDefault(_SelectionTest);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.Editor = new _EditorClass2.default();

	window.Selection = new _SelectionTest2.default();

	// usefull link
	// https://html.spec.whatwg.org/multipage/interaction.html#attr-contenteditable

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	var _EditableClass = __webpack_require__(3);

	var _EditableClass2 = _interopRequireDefault(_EditableClass);

	var _ElementClass = __webpack_require__(4);

	var _ElementClass2 = _interopRequireDefault(_ElementClass);

	var _NavigationClass = __webpack_require__(5);

	var _NavigationClass2 = _interopRequireDefault(_NavigationClass);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Editor main class
	 */
	var Editor = function () {
	  /**
	   * __construct
	   * add element editable prototype
	   * add editor navigation
	   */
	  function Editor(options) {
	    _classCallCheck(this, Editor);

	    var element = new _ElementClass2.default();
	    element.prototype(_config2.default.editable.prototype, this.editable);

	    new _NavigationClass2.default();
	  }

	  /**
	   * edit this area
	   * add all the data attribute
	   * @param Object (editable area options)
	   */


	  _createClass(Editor, [{
	    key: 'editable',
	    value: function editable(options) {
	      return new _EditableClass2.default(options, this);
	    }

	    /**
	     * add input into editor navigation
	     * @for Title
	     * @for Description
	     * @options: title, name, 
	     */

	  }, {
	    key: 'addEditorInput',
	    value: function addEditorInput(options) {}
	  }]);

	  return Editor;
	}();

	/**
	 * Example:
	 * var b = new Editor({
	 *  // upload image into the server and get image url
	 *  // the default value is base64 data url
	 *  uploadImage: function(file){ 
	 *      $.ajax({
	 *          url: ...,
	 *          data: new FormData(file)
	 *      }).done(url){
	 *          b.insertImage(url)
	 *      }
	 *  },
	 *  url: ...,
	 *  method: ...
	 *  done: ...
	 *  success: ...
	 *  faild: ...
	 * });
	 * 
	 * var a = document.getElementById('test');
	 * a.editable({
	 *  name: ... // for ajax request key = value
	 *  type: popup || regular // the type of editing 
	 *  background: true,
	 *  onlyIfHasBackground: true // background editable only if element allready has bg 
	 *  text: true,
	 *  image: true,
	 *  html: false
	 * });
	 * 
	 * the plugin create only 'one' editor navigation for all 
	 * editable area
	 * the 'SAVE' btn send all the the editable area content togther
	 */


	exports.default = Editor;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var _exports = module.exports;
	var prefix = 'frontendEditor';

	/**
	 * concat two objects
	 * @param Object (def)
	 * @param Object (set)
	 * @return Object (def with new value of set)
	 */
	_exports.extends = function (def, set) {
	    for (var key in set) {
	        if (def.hasOwnProperty(key)) {
	            def[key] = set[key];
	        }
	    }

	    return def;
	};

	/**
	 * @for Editor.class.js
	 * @for Editable.class.js
	 * @for Element.class.js
	 * @for ajax/Serialize.class.js
	 */
	_exports.editable = {
	    prototype: 'editable',
	    attribute: {
	        name: prefix + '-name',
	        background: prefix + '-bg',
	        bgExists: prefix + '-bg-exists',
	        image: prefix + '-image',
	        html: prefix + '-html',
	        /**
	        * attribute says - this is our plugin editable area 
	        * toLowerCase - prevent bug: the browser render attribute name as lowercase
	        * @for Selection.class.js 
	        * @for Editable.class.js 
	        * @for Element.class.js
	        */
	        plugin: prefix.toLowerCase()
	    },
	    default: {
	        name: null,
	        type: 'inline',
	        background: true,
	        bgExists: true, // background editable only if bg element allready exists
	        image: true,
	        html: false
	    }
	};

	/**
	 * @for editor/Nav.class.js
	 */
	_exports.nav = {
	    class: prefix + '-nav',
	    id: prefix + '-nav'
	};

	/**
	 * @for editor/button/*.class.js
	 */
	_exports.button = {
	    class: prefix + '-nav-btn',
	    tagName: 'button'
	};

	/**
	 * @for ajax/Ajax.class.js
	 * @for ajax/Serialize.class.js
	 */
	_exports.ajax = {
	    url: 'http://localhost',
	    method: 'POST',
	    header: {},
	    success: function success(data) {
	        console.log(data, 'success');
	    },
	    done: function done(data) {
	        console.log(data, 'done');
	    },
	    failed: function failed(data) {
	        console.log(data, 'error');
	    }
	};

	/**
	 * @for image/Image.class.js
	 */
	_exports.image = {
	    upload: null
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * get all the editable area
	 */
	var Editable = function () {

	    /**
	     * __construct
	     * get editable area options and extends them with the default optinos
	     * this.set()
	     */
	    function Editable(options, element) {
	        _classCallCheck(this, Editable);

	        this.config = _config2.default.editable;
	        this.attrs = this.config.attribute;
	        this.element = element;
	        this.options = _config2.default.extends(this.config.default, options);

	        this.set();
	        return this;
	    }

	    /**
	     * add element attribute
	     * @param String
	     * @param String
	     */


	    _createClass(Editable, [{
	        key: 'addAttr',
	        value: function addAttr(name, value) {
	            this.element.setAttribute(name, value);
	        }

	        /**
	         * remove element attribute
	         * @param String
	         * @param String
	         */

	    }, {
	        key: 'removeAttr',
	        value: function removeAttr(name) {
	            this.element.removeAttribute(name);
	        }

	        /**
	         * set editable area attribute
	         * - check if has attribure for this options 
	         */

	    }, {
	        key: 'set',
	        value: function set() {
	            this.addAttr(this.attrs.plugin, this.attrs.plugin);
	            this.addAttr('contenteditable', 'true');
	            for (var key in this.options) {
	                if (this.attrs.hasOwnProperty(key)) {
	                    this.addAttr(this.attrs[key], this.options[key]);
	                }
	            }
	        }

	        /**
	         * set contenteditable = fales
	         */

	    }, {
	        key: 'unset',
	        value: function unset() {
	            this.addAttr('contenteditable', 'false');
	        }

	        /**
	         * remove all editable area attribure include contenteditable
	         */

	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            this.removeAttr(this.attrs.plugin);
	            this.removeAttr('contenteditable');
	            for (var key in this.options) {
	                if (this.attrs.hasOwnProperty(key)) {
	                    this.removeAttr(this.attrs[key]);
	                }
	            }
	        }
	    }]);

	    return Editable;
	}();

	exports.default = Editable;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * all about the Element
	 */
	var Element = function () {
	    function Element() {
	        _classCallCheck(this, Element);
	    }

	    /**
	     * create element prototype
	     * @param String (prototype.name)
	     * @param All (prototype.name = value)
	     */


	    _createClass(Element, [{
	        key: 'prototype',
	        value: function prototype(key, value) {
	            window.Element.prototype[key] = value;
	        }

	        /**
	         * get all element with plugin attribute (editable area)
	         * @return Array Of Object (element)
	         */

	    }, {
	        key: 'getAllEditable',
	        value: function getAllEditable() {
	            return document.querySelectorAll('[' + _config2.default.editable.attribute.plugin + ']');
	        }

	        /**
	         * get all the element children and call fn on each child
	         * @param Object (node)
	         * @param FN (callback)
	         */

	    }, {
	        key: 'childrenFN',
	        value: function childrenFN(node, FN) {
	            var child = node.childNodes;

	            child.forEach(function (elem) {
	                elem.children ? this.childrenFN(elem, FN) : FN(elem);
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

	    }, {
	        key: 'appendFromTo',
	        value: function appendFromTo(node, from, to, FN) {
	            var text = node.textContent || '';
	            var parent = node.parentElement || null;
	            var nextSibling = node.nextSibling;

	            if (to == null) to = text.length;
	            if (from == null) from = 0;

	            var before = text.substring(0, from);
	            var main = text.substring(from, to);
	            var after = text.substring(to, text.length);

	            parent.removeChild(node);

	            main = main.length > 0 ? FN(main) : null;

	            if (before.length > 0) parent.insertBefore(createTextNode(before), nextSibling);
	            if (main) parent.insertBefore(main, nextSibling);
	            if (after.length > 0) parent.insertBefore(createTextNode(after), nextSibling);

	            return main;
	        }

	        /**
	         * prevent empty: nextSibling, previousSibling 
	         * @param Object (node)
	         * @return Object || null 
	         */

	    }, {
	        key: 'preventEmptySibling',
	        value: function preventEmptySibling(sibling) {
	            return sibling && sibling.nodeType == 3 && sibling.data && sibling.data.trim().length == 0 ? null : sibling;
	        }

	        /**
	         * create text node
	         * @param String
	         * @return Object
	         */

	    }, {
	        key: 'createTextNode',
	        value: function createTextNode(string) {
	            return document.createTextNode(string).cloneNode(true);
	        }
	    }]);

	    return Element;
	}();

	exports.default = Element;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	var _ButtonClass = __webpack_require__(6);

	var _ButtonClass2 = _interopRequireDefault(_ButtonClass);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Navigation = function () {

	    /**
	     * __construct
	     * create navigation
	     */
	    function Navigation() {
	        _classCallCheck(this, Navigation);

	        this.config = _config2.default.nav;
	        this.create(this.config.id, new _ButtonClass2.default().get());
	    }

	    /**
	     * create navigation element (DOM)
	     * @param String (nav id)
	     * @return Object
	     */


	    _createClass(Navigation, [{
	        key: 'element',
	        value: function element(navId) {
	            var elem = document.createElement('nav');
	            elem.id = navId;
	            elem.classList.add(this.config.class);

	            return elem.cloneNode();
	        }

	        /**
	         * append DOM element into the document.body
	         * @param Object (DOM element)
	         */

	    }, {
	        key: 'appendToDocument',
	        value: function appendToDocument(Node) {
	            document.body.appendChild(Node);
	        }

	        /**
	         * append DOM element into the nav 
	         * @param Object (nav element)
	         * @param Object (DOM element)
	         */

	    }, {
	        key: 'appendToNav',
	        value: function appendToNav(nav, Node) {
	            nav.appendChild(Node);
	        }

	        /**
	         * append edit button into nav
	         * @param Object (nav element)
	         * @param Array (buttons)
	         */

	    }, {
	        key: 'appendEditButtons',
	        value: function appendEditButtons(nav, buttons) {
	            var self = this;
	            buttons.forEach(function (element) {
	                self.appendToNav(nav, element);
	            });
	        }

	        /**
	         * create navigation
	         * @param String (nav id)
	         * @param Array (buttons element)
	         * - create nav
	         * - append edit button into nav
	         * - append nav into body
	         */

	    }, {
	        key: 'create',
	        value: function create(navId, buttons) {
	            var nav = this.element(navId);

	            this.appendEditButtons(nav, buttons);
	            this.appendToDocument(nav);
	        }
	    }]);

	    return Navigation;
	}();

	exports.default = Navigation;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	var _imageArray = __webpack_require__(7);

	var _navArray = __webpack_require__(11);

	var _textArray = __webpack_require__(14);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Button = function () {
	    function Button() {
	        _classCallCheck(this, Button);

	        this.config = _config2.default.button;
	        this.btn = [].concat(_imageArray.image, _navArray.nav, _textArray.text);
	    }

	    /**
	     * get all button elements
	     * @return Array of Object
	     */


	    _createClass(Button, [{
	        key: 'get',
	        value: function get() {
	            var arr = [];
	            this.btn.forEach(function (button) {
	                arr.push(this.create(button));
	            }, this);

	            return arr;
	        }

	        /**
	         * create btn from object 
	         * @property name, description, class, text, id, element, event 
	         * @param Object
	         * @return Object
	         */

	    }, {
	        key: 'create',
	        value: function create(btn) {
	            var element = _typeof(btn.element) == 'object' ? btn.element : this.element();
	            element.classList.add(this.config.class + (btn.class || ''));
	            element.title = btn.description || '';
	            element.id = btn.id || '';
	            if (btn.text && btn.text.length > 0) element.appendChild(document.createTextNode(btn.text));

	            this.event(btn.event, element);

	            return element;
	        }

	        /**
	         * default button element
	         * @return Object (dom element)
	         */

	    }, {
	        key: 'element',
	        value: function element() {
	            return document.createElement(this.config.tagName).cloneNode();
	        }

	        /**
	         * create button events
	         * @param Array of Object || Object (events)
	         * @param Object (dom element)
	         */

	    }, {
	        key: 'event',
	        value: function event(events, element) {
	            if (Array.isArray(events)) {
	                events.forEach(function (event) {
	                    element.addEventListener(event.name, event.fn);
	                }, this);
	            } else {
	                element.addEventListener(events.name, events.fn);
	            }
	        }
	    }]);

	    return Button;
	}();

	/* ## EXAMPLE of button object
	{
	    name: 'test', // btn name
	    description: 'test btn', // btn description - for title tag - optional
	    class: 'test-btn', // add class to this btn - optional
	    text: 'test', // insert text into the btn - optional
	    id: 'test-btn', // add id to this btn - optional
	    element: document.createElement('button').cloneNode(), // btn element - optional
	    event: [
	        {
	            name: 'click',
	            fn: function(){
	                console.log('test');
	            }
	        }
	    ],// btn event || for multiple event use []
	}
	*/


	exports.default = Button;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ImageClass = __webpack_require__(8);

	var _ImageClass2 = _interopRequireDefault(_ImageClass);

	var _Base = __webpack_require__(10);

	var _Base2 = _interopRequireDefault(_Base);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _exports = module.exports;

	_exports.image = [
	/**
	 * add image
	 */
	{
	    name: 'Add image',
	    text: 'Add image',
	    element: function () {
	        var label = document.createElement('label');
	        var input = document.createElement('input');
	        input.type = 'file';
	        input.accept = 'image/*';
	        input.style.display = 'none';

	        label.appendChild(input);

	        return label;
	    }(),
	    event: [{
	        name: 'mousedown',
	        fn: function fn(event) {
	            event.preventDefault();
	        }
	    }, {
	        name: 'change',
	        fn: function fn(event) {
	            var files = event.target.files || event.dataTransfer.files;
	            _Base2.default.image(files[0], function (url, file) {
	                var Img = new _ImageClass2.default();
	                Img.insert(url).setAttribute('alt', file.type);
	            });
	        }
	    }]
	}];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	var _SelectionClass = __webpack_require__(9);

	var _SelectionClass2 = _interopRequireDefault(_SelectionClass);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * image class
	 */
	var Image = function () {
	    function Image() {
	        _classCallCheck(this, Image);

	        this.config = _config2.default.image;
	        this.create();
	    }

	    /**
	     * create image element
	     * @return Object (this.img)
	     */


	    _createClass(Image, [{
	        key: 'create',
	        value: function create() {
	            return this.img = document.createElement('img').cloneNode();
	        }

	        /**
	         * append this.img into user selection
	         * @param String (url)
	         * @return Object (this.img) 
	         */

	    }, {
	        key: 'insert',
	        value: function insert(url) {
	            var selection = new _SelectionClass2.default();
	            this.img.src = url;
	            selection.append(this.img);
	            return this.img;
	        }
	    }]);

	    return Image;
	}();

	exports.default = Image;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * class for user selection
	 */
	var Selection = function () {

	    /**
	     * __construct
	     * @return Object (this)
	     */
	    function Selection() {
	        _classCallCheck(this, Selection);

	        this.config = _config2.default.editable;
	    }

	    /**
	     * return user selection 
	     * @return Object || Boolean
	     */


	    _createClass(Selection, [{
	        key: 'get',
	        value: function get() {
	            if (window.getSelection && window.getSelection().toString()) {
	                return window.getSelection();
	            }

	            if (document.getSelection && document.getSelection.toString()) {
	                return document.getSelection();
	            }

	            var selection = document.selection && document.selection.createRange();
	            if (typeof selection !== 'undefined' && selection.text && selection.text.toString()) {
	                return selection.text;
	            }

	            return false;
	        }

	        /**
	         * get user selection text
	         * @return String
	         */

	    }, {
	        key: 'text',
	        value: function text() {
	            var selected = this.get();

	            if (selected) {
	                return selected.toString();
	            }
	        }

	        /**
	         * insert selected text into DOM (node)
	         * @param Object (Node | DOM)
	         */

	    }, {
	        key: 'append',
	        value: function append(Node) {
	            var selected = this.get();

	            if (selected && selected.rangeCount) {
	                var range = selected.getRangeAt(0).cloneRange();
	                range.surroundContents(Node.cloneNode());
	                selected.removeAllRanges();
	                selected.addRange(range);
	            }
	        }

	        /**
	         * get parent element of user selection
	         * @return Object | Null
	         */

	    }, {
	        key: 'parent',
	        value: function parent() {
	            var selection = this.get().anchorNode;
	            // prevent '#text' node as element
	            if (selection && selection.nodeType == 3) selection = selection.parentElement;

	            return selection ? selection : null;
	        }

	        /**
	         * check if the area of user selection is editable
	         * - check if parent node is editable
	         */

	    }, {
	        key: 'parentEditable',
	        value: function parentEditable() {
	            var parent = this.parent();
	            var editable = false;

	            while (parent) {
	                if (parent.getAttribute('contenteditable') == 'true' && parent.getAttribute(this.config.attribute.plugin) == this.config.attribute.plugin) {
	                    editable = true;
	                    break;
	                }

	                parent = parent.parentElement;
	            }

	            return editable;
	        }

	        /**
	         * remove user selection dom element
	         * (remove the selection parent element itself not the innerText)
	         * the param Node need to be object that already exist in the document
	         * @param Object (Node | DOM)
	         */

	    }, {
	        key: 'remove_dom',
	        value: function remove_dom(Node) {
	            var selected = this.get();

	            if (selected && selected.rangeCount) {
	                var newText = document.createTextNode(this.text());
	                var parent = Node.parentElement;

	                parent.insertBefore(newText, Node);
	                parent.removeChild(Node);
	            }
	        }
	    }]);

	    return Selection;
	}();

	exports.default = Selection;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	var _exports = module.exports;

	/**
	 * clean base64 string from "data:image/*;base64,"
	 * @param String
	 */
	_exports.clean = function (b64) {
	    return b64.substring(b64.indexOf(',') + 1);
	};

	/**
	 * get image file and return it as base64 data url
	 * @param Object (file)
	 * @param FN (callback: url: String, file: Object)
	 */
	_exports.image = function (file, callback) {
	    var reader = new FileReader();
	    reader.onload = function (event) {
	        callback(event.target.result, file);
	    };
	    reader.readAsDataURL(file);
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _AjaxClass = __webpack_require__(12);

	var _AjaxClass2 = _interopRequireDefault(_AjaxClass);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _exports = module.exports;

	_exports.nav = [
	/**
	 * save
	 * @CLASS Ajax.class.js, Serialize.class.js 
	 * @FN set()
	 */
	{
	    name: 'save',
	    text: 'Save',
	    event: {
	        name: 'click',
	        fn: function fn() {
	            var ajax = new _AjaxClass2.default();
	            ajax.request().done(function (xhr) {
	                console.log('done', xhr);
	            });
	        }
	    }
	}];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	var _SerializeClass = __webpack_require__(13);

	var _SerializeClass2 = _interopRequireDefault(_SerializeClass);

	var _ElementClass = __webpack_require__(4);

	var _ElementClass2 = _interopRequireDefault(_ElementClass);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * class for ajax request
	 */
	var Ajax = function () {
	    function Ajax() {
	        _classCallCheck(this, Ajax);

	        this.config = _config2.default.ajax;
	        this.xhr;
	        this.Serialize = new _SerializeClass2.default();
	    }

	    /**
	     * add header
	     * @param Array (example: ['Content-Type', 'application/x-www-form-urlencoded'])
	     */


	    _createClass(Ajax, [{
	        key: 'addHeader',
	        value: function addHeader(arr) {
	            this.config.header[arr[0]] = arr[1];
	        }

	        /**
	         * set ajax request header
	         * setRequestHeader
	         */

	    }, {
	        key: 'header',
	        value: function header() {
	            for (var head in this.config.header) {
	                this.xhr.setRequestHeader(head, this.config.header[head]);
	            }
	        }

	        /**
	         * add data to request 
	         * @param String
	         * @param String
	         */

	    }, {
	        key: 'addData',
	        value: function addData(key, value) {
	            this.Serialize.addData(key, value);
	        }

	        /**
	         * callback function when ajax request success (onload)
	         * @param FN (callback)
	         * @return Object (this)
	         */

	    }, {
	        key: 'success',
	        value: function success(callback) {
	            this.xhr.onload = callback(this.xhr);
	            return this;
	        }

	        /**
	         * callback function when ajax request failed (onerror)
	         * @param FN (callback)
	         * @return Object (this)
	         */

	    }, {
	        key: 'error',
	        value: function error(callback) {
	            this.xhr.onerror = callback(this.xhr);
	            return this;
	        }

	        /**
	         * callback function when ajax request done (readyState == 4)
	         * @param FN (callback)
	         * @return Object (this)
	         */

	    }, {
	        key: 'done',
	        value: function done(callback) {
	            var self = this;
	            this.xhr.onreadystatechange = function () {
	                if (self.xhr.readyState == 4) {
	                    callback(self.xhr);
	                }
	            };
	            return this;
	        }

	        /**
	         * create ajax request
	         * - get editable element data
	         * - serialize data
	         * @callback Object (ajax object - xhr)
	         * @return Object (this)
	         */

	    }, {
	        key: 'request',
	        value: function request() {
	            var self = this;
	            var elements = new _ElementClass2.default().getAllEditable();
	            var method = self.config.method;
	            this.xhr = new XMLHttpRequest();

	            // open request
	            if (method == 'GET') {
	                this.xhr.open(method, self.config.url + '?' + this.Serialize.GET(elements), true);
	                this.addHeader(["Content-Type", "application/x-www-form-urlencoded"]);
	            } else if (method == 'POST') {
	                this.xhr.open(method, self.config.url, true);
	                this.addHeader(["Content-Type", "multipart/form-data"]);
	            }

	            // headers
	            this.header();

	            // send
	            if (method == 'GET') {
	                this.xhr.send();
	            } else if (method == 'POST') {
	                this.xhr.send(this.Serialize.POST(elements));
	            }

	            return this;
	        }
	    }]);

	    return Ajax;
	}();

	exports.default = Ajax;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * serialize data for ajax request
	 */
	var Serialize = function () {
	    function Serialize() {
	        _classCallCheck(this, Serialize);

	        this.FromData = new FormData(); // for POST method
	        this.StringData = ''; // for GET method
	        this.config = _config2.default.editable;
	        this.method = _config2.default.ajax.method;
	    }

	    /**
	     * serialize array of elements for POST ajax method
	     * @param Array of Object (elements)
	     * @return Object
	     */


	    _createClass(Serialize, [{
	        key: 'POST',
	        value: function POST(ArrayOfElements) {
	            this.convert(ArrayOfElements);
	            return this.FromData;
	        }

	        /**
	         * serialize array of elements for GET
	         * @param Array of Object (elements)
	         * @return String
	         */

	    }, {
	        key: 'GET',
	        value: function GET(ArrayOfElements) {
	            this.convert(ArrayOfElements);
	            return this.StringData;
	        }

	        /**
	         * create object from all the editable elements
	         * @param Array of Object
	         * @structure: {element.name : element.content}
	         */

	    }, {
	        key: 'makeBigObject',
	        value: function makeBigObject(ArrayOfElements) {
	            var object = {};

	            ArrayOfElements.forEach(function (elem) {
	                object[elem.getAttribute(this.config.attribute.name)] = elem.innerHTML;
	            }, this);

	            return object;
	        }

	        /**
	         * convert this.makeBigObject into ajax request by this.addData
	         * @param Array of Object
	         */

	    }, {
	        key: 'convert',
	        value: function convert(ArrayOfElements) {
	            var object = this.makeBigObject(ArrayOfElements);
	            for (var key in object) {
	                this.addData(key, object[key]);
	            }
	        }

	        /**
	         * add key = value into this.data 
	         * for GET | POST method
	         * @param String (key)
	         * @param String (value)
	         */

	    }, {
	        key: 'addData',
	        value: function addData(key, value) {
	            if (this.method == 'GET') {
	                var and = this.StringData.length > 0 ? '&' : '';
	                this.StringData += encodeURIComponent(key.trim()) + '=' + encodeURIComponent(value.trim());
	            } else if (this.method == 'POST') {
	                this.FromData.append(key, value);
	            }
	        }
	    }]);

	    return Serialize;
	}();

	exports.default = Serialize;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _SelectionTest = __webpack_require__(15);

	var _SelectionTest2 = _interopRequireDefault(_SelectionTest);

	var _ElementClass = __webpack_require__(4);

	var _ElementClass2 = _interopRequireDefault(_ElementClass);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var editorElement = new _ElementClass2.default();
	var selection = new _SelectionTest2.default();
	var _exports = module.exports;

	_exports.text = [
	/**
	 * bold
	 * @DOM span
	 * @CSS font-weight="bold"
	 */
	{
	    name: 'bold',
	    text: 'B',
	    event: {
	        name: 'click',
	        fn: function fn() {
	            var bold = function bold(text) {
	                var b = document.createElement('span');
	                b.style.fontWeight = 'bold';

	                text = editorElement.createTextNode(text);
	                b.appendChild(text);

	                return b.cloneNode(true);
	            };

	            var unbold = function unbold(text) {
	                var b = document.createElement('span');
	                b.style.fontWeight = 'normal';

	                text = editorElement.createTextNode(text);
	                b.appendChild(text);

	                return b.cloneNode(true);
	            };

	            var parent = selection.parent();
	            if (parent && parent.style.fontWeight == 'bold') {
	                if (parent.textContent.trim() == selection.text().trim()) return parent.style.fontWeight = 'normal';
	                return selection.append(unbold);
	            }
	            selection.append(bold);
	        }
	    }
	},
	/**
	 * italic
	 * @DOM span
	 * @CSS font-style="italic"
	 */
	{
	    name: 'italic',
	    text: 'I',
	    event: {
	        name: 'click',
	        fn: function fn() {
	            var italic = function italic(text) {
	                var i = document.createElement('span');
	                i.style.fontStyle = 'italic';

	                text = editorElement.createTextNode(text);
	                i.appendChild(text);

	                return i.cloneNode(true);
	            };

	            var unitalic = function unitalic(text) {
	                var i = document.createElement('span');
	                i.style.fontStyle = 'normal';

	                text = editorElement.createTextNode(text);
	                i.appendChild(text);

	                return i.cloneNode(true);
	            };

	            var parent = selection.parent();
	            if (parent && parent.style.fontStyle == 'italic') {
	                if (parent.textContent.trim() == selection.text().trim()) return parent.style.fontStyle = 'normal';
	                return selection.append(unitalic);
	            }
	            selection.append(italic);
	        }
	    }
	},
	/**
	 * underline
	 * @DOM span
	 * @CSS text-decoration="underline"
	 */
	{
	    name: 'underline',
	    text: 'U',
	    event: {
	        name: 'click',
	        fn: function fn() {
	            var underline = function underline(text) {
	                var u = document.createElement('span');
	                u.style.textDecoration = 'underline';

	                text = editorElement.createTextNode(text);
	                u.appendChild(text);

	                return u.cloneNode(true);
	            };

	            var ununderline = function ununderline(text) {
	                var u = document.createElement('span');
	                u.style.textDecoration = 'none';

	                text = editorElement.createTextNode(text);
	                u.appendChild(text);

	                return u.cloneNode(true);
	            };

	            var parent = selection.parent();
	            if (parent && parent.style.textDecoration == 'underline') {
	                if (parent.textContent.trim() == selection.text().trim()) return parent.style.textDecoration = 'none';
	                return selection.append(ununderline);
	            }

	            selection.append(underline);
	        }
	    }
	}];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	var _ElementClass = __webpack_require__(4);

	var _ElementClass2 = _interopRequireDefault(_ElementClass);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * class for user selection
	 */
	var SelectionTest = function () {

	    /**
	     * __construct
	     * @return Object (this)
	     */
	    function SelectionTest() {
	        _classCallCheck(this, SelectionTest);

	        this.config = _config2.default.editable;
	        this.element = new _ElementClass2.default();
	    }

	    /**
	     * return user selection 
	     * @return Object || Boolean
	     */


	    _createClass(SelectionTest, [{
	        key: 'get',
	        value: function get() {
	            if (window.getSelection && window.getSelection().toString()) {
	                return window.getSelection();
	            }

	            if (document.getSelection && document.getSelection.toString()) {
	                return document.getSelection();
	            }

	            var selection = document.selection && document.selection.createRange();
	            if (typeof selection !== 'undefined' && selection.text && selection.text.toString()) {
	                return selection.text;
	            }

	            return false;
	        }

	        /**
	         * get user selection text
	         * @return String
	         */

	    }, {
	        key: 'text',
	        value: function text() {
	            var selected = this.get();
	            return selected ? selected.toString() : null;
	        }

	        /**
	         * insert selected text into DOM (node)
	         * @param Object (Node | DOM)
	         */

	    }, {
	        key: 'append',
	        value: function append(FN) {
	            if (!this.parentEditable()) return;

	            var selection = this.get();
	            if (selection.isCollapsed) return;

	            var range = selection.getRangeAt(0);
	            var start = range.startContainer;
	            var end = range.endContainer;
	            var offset = { start: range.startOffset, end: range.endOffset };
	            var sibling = { start: range.startContainer.nextSibling, end: range.endContainer.previousSibling };

	            this.appendProcess(start, end, sibling, offset, range, FN);

	            selection.removeAllRanges();
	        }

	        /**
	         * the proccess of this.append()
	         * @param Object (range.startContainer)
	         * @param Object (range.endContainer)
	         * @param Object (range start && end sibling)
	         * @param Object (range start && end offset)
	         * @param Object (range)
	         * @param FN (what to do with the selected text)
	         */

	    }, {
	        key: 'appendProcess',
	        value: function appendProcess(start, end, sibling, offset, range, FN) {
	            var self = this;
	            var startElement, endElement;

	            // same element
	            if (start == end) return this.element.appendFromTo(start, offset.start, offset.end, FN);

	            // not the same element
	            startElement = this.element.appendFromTo(start, offset.start, null, FN);
	            endElement = this.element.appendFromTo(end, null, offset.end, FN);

	            // refresh sibling after the first appendFromTo fn
	            // prevent junk sibling
	            if (sibling.start == null) sibling.start = this.element.preventEmptySibling(range.startContainer.nextSibling);
	            if (sibling.end == null) sibling.end = this.element.preventEmptySibling(range.endContainer.previousSibling);

	            // previousSibling of endContainer is startContainer after append
	            if (sibling.end == startElement) return;

	            // only 'one' element between end & start
	            if (sibling.start == sibling.end && sibling.start != null) {
	                var siblingStartChild = this.element.childrenFN(sibling.start, function (elem) {
	                    self.appendFullElement(elem, FN);
	                });

	                if (!siblingStartChild) this.appendFullElement(sibling.start, FN);
	                return;
	            }

	            // get all the element between
	            this.allElementBetween(sibling, offset, end, FN);
	        }
	    }, {
	        key: 'allElementBetween',
	        value: function allElementBetween(sibling, offset, end, FN) {
	            var self = this;
	            var next = sibling.start;
	            var child, isTheEndContainer;

	            while (next) {
	                // ### children
	                isTheEndContainer = false;
	                child = this.element.childrenFN(next, function (elem) {
	                    if (!end) self.appendFullElement(elem, FN);
	                    if (elem == sibling.end) isTheEndContainer = true;
	                });

	                // ### no children
	                if (!child && !isTheEndContainer) next = this.appendFullElement(next, FN);

	                // ### break
	                if (next == sibling.end.toString()) {
	                    if (end.textContent.toString().substring(0, offset.end) == next.textContent) break;
	                }
	                if (next == sibling.end || isTheEndContainer) break;

	                // ### next while
	                next = next.nextSibling;
	            }
	        }
	    }, {
	        key: 'appendFullElement',
	        value: function appendFullElement(node, FN) {
	            return this.element.appendFromTo(node, null, null, FN);
	        }

	        /**
	         * get parent element of user selection
	         * @return Object | Null
	         */

	    }, {
	        key: 'parent',
	        value: function parent() {
	            var selection = this.get().anchorNode;
	            // prevent '#text' node as element
	            if (selection && selection.nodeType == 3) selection = selection.parentElement;

	            return selection ? selection : null;
	        }

	        /**
	         * check if the area of user selection is editable
	         * - check if parent node is editable
	         */

	    }, {
	        key: 'parentEditable',
	        value: function parentEditable() {
	            var parent = this.parent();
	            var editable = false;

	            while (parent) {
	                if (parent.getAttribute('contenteditable') == 'true' && parent.getAttribute(this.config.attribute.plugin) == this.config.attribute.plugin) {
	                    editable = true;
	                    break;
	                }

	                parent = parent.parentElement;
	            }

	            return editable;
	        }
	    }]);

	    return SelectionTest;
	}();

	exports.default = SelectionTest;

/***/ }
/******/ ]);