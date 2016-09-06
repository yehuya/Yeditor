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

	var _SelectionClass = __webpack_require__(1);

	var _SelectionClass2 = _interopRequireDefault(_SelectionClass);

	var _EditableClass = __webpack_require__(2);

	var _EditableClass2 = _interopRequireDefault(_EditableClass);

	var _EditorClass = __webpack_require__(4);

	var _EditorClass2 = _interopRequireDefault(_EditorClass);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.selection = new _SelectionClass2.default();
	window.editable = new _EditableClass2.default();
	window.editor = new _EditorClass2.default();

	// usefull link
	// https://html.spec.whatwg.org/multipage/interaction.html#attr-contenteditable

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Selection = function () {

	    /**
	     * __construct
	     * @return Object (this)
	     */
	    function Selection() {
	        _classCallCheck(this, Selection);

	        return this;
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
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _config = __webpack_require__(3);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * get all the editable area
	 */
	var Editable = function () {

	    /**
	     * __construct
	     * set param from config file
	     */
	    function Editable() {
	        _classCallCheck(this, Editable);

	        var config = _config2.default.editable;
	        this.htmlTag = config.htmlTag;
	        this.nameAttribute = config.nameAttribute;
	    }

	    /**
	     * get all editable area
	     * @return Array 
	     */


	    _createClass(Editable, [{
	        key: 'get',
	        value: function get() {
	            var allEditArea = document.querySelectorAll(this.htmlTag);
	            return allEditArea;
	        }

	        /**
	         * set 'editable area' as editable
	         */

	    }, {
	        key: 'set',
	        value: function set() {
	            var allEditArea = this.get();
	            allEditArea.forEach(function (element) {
	                element.setAttribute('contenteditable', 'true');
	            }, this);
	        }

	        /**
	         * unset 'editable area' as editable 
	         */

	    }, {
	        key: 'unset',
	        value: function unset() {
	            var allEditArea = this.get();
	            allEditArea.forEach(function (element) {
	                element.removeAttribute('contenteditable');
	            }, this);
	        }
	    }]);

	    return Editable;
	}();

	exports.default = Editable;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	var _exports = module.exports;
	var prefix = 'frontendEditor-';

	/**
	 * config for Editable.class.js
	 */
	_exports.editable = {
	  htmlTag: 'edit',
	  nameAttribute: 'name'
	};

	/**
	 * config for editor/Nav.class.js
	 */
	_exports.nav = {
	  navClass: prefix + 'nav',
	  navTextId: prefix + 'nav-text',
	  navImageId: prefix + 'nav-image'
	};

	/**
	 * config for editor/Button.class.js
	 */
	_exports.button = {
	  btnClass: prefix + 'nav-btn'
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _ButtonClass = __webpack_require__(5);

	var _ButtonClass2 = _interopRequireDefault(_ButtonClass);

	var _NavClass = __webpack_require__(7);

	var _NavClass2 = _interopRequireDefault(_NavClass);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Editor = function Editor() {
	    _classCallCheck(this, Editor);

	    this.Button = new _ButtonClass2.default();
	    this.Nav = new _NavClass2.default();
	};

	exports.default = Editor;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _config = __webpack_require__(3);

	var _config2 = _interopRequireDefault(_config);

	var _button = __webpack_require__(6);

	var _button2 = _interopRequireDefault(_button);

	var _SelectionClass = __webpack_require__(1);

	var _SelectionClass2 = _interopRequireDefault(_SelectionClass);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * editor button class
	 */
	var Button = function () {
	    function Button() {
	        _classCallCheck(this, Button);

	        this.Selection = new _SelectionClass2.default();
	        this.config = _config2.default.button;
	        this.btn_image = _button2.default.image;
	        this.btn_text = _button2.default.text;
	        this.btnTextElement = this.createFromArray(this.btn_text);
	        this.btnImageElement = this.createFromArray(this.btn_image);
	    }

	    /**
	     * event onClick on button
	     * @param Object (button)
	     * @Param FN (callback function)
	     */


	    _createClass(Button, [{
	        key: 'click',
	        value: function click(button, callback) {
	            button.addEventListener('click', function (e) {
	                e.preventDefault();
	                if (typeof callback == 'function') {
	                    callback();
	                }
	            });
	        }

	        /**
	         * create button from btn object
	         * get btn object form btn.[image|text] and make it as DOM element
	         * @param Object (btn object)
	         * @return Object (DOM element)
	         */

	    }, {
	        key: 'create',
	        value: function create(Object) {
	            var self = this;
	            var name = Object.name || '?';
	            var node = Object.node() || null;

	            var elem = document.createElement('button');
	            elem.classList.add(this.config.btnClass);
	            elem.title = name;
	            elem.innerText = name;

	            this.click(elem, function () {
	                self.Selection.append(node);
	            });

	            return elem;
	        }

	        /**
	         * create elements from array
	         * take the object of button and make it as dom element
	         * @param Array
	         * @return Array
	         */

	    }, {
	        key: 'createFromArray',
	        value: function createFromArray(array) {
	            var self = this;
	            var newArray = [];
	            array.forEach(function (element) {
	                newArray.push(self.create(element));
	            });

	            return newArray;
	        }

	        /**
	         * add image button
	         * @param Object
	         */

	    }, {
	        key: 'addImageButton',
	        value: function addImageButton(Object) {
	            if ((typeof Object === 'undefined' ? 'undefined' : _typeof(Object)) == 'object') {
	                this.btn_image.push(Object);
	            }
	        }

	        /**
	         * add text button
	         * @param Object
	         */

	    }, {
	        key: 'addTextButton',
	        value: function addTextButton(Object) {
	            if ((typeof Object === 'undefined' ? 'undefined' : _typeof(Object)) == 'object') {
	                this.btn_text.push(Object);
	            }
	        }
	    }]);

	    return Button;
	}();

	exports.default = Button;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	var _exports = module.exports;

	_exports.text = [
	/**
	 * bold
	 * @DOM span
	 * @CSS font-weight="bold"
	 */
	{
	    name: 'bold',
	    node: function node() {
	        var element = document.createElement('span');
	        element.style.fontWeight = 'bold';

	        return element.cloneNode();
	    }
	},
	/**
	 * italic
	 * @DOM span
	 * @CSS font-style="italic"
	 */
	{
	    name: 'italic',
	    node: function node() {
	        var element = document.createElement('span');
	        element.style.fontStyle = 'italic';

	        return element.cloneNode();
	    }
	},
	/**
	 * underline
	 * @DOM span
	 * @CSS text-decoration="underline"
	 */
	{
	    name: 'underline',
	    node: function node() {
	        var element = document.createElement('span');
	        element.style.textDecoration = 'underline';

	        return element.cloneNode();
	    }
	}];

	_exports.image = [];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _config = __webpack_require__(3);

	var _config2 = _interopRequireDefault(_config);

	var _ButtonClass = __webpack_require__(5);

	var _ButtonClass2 = _interopRequireDefault(_ButtonClass);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Nav = function () {

	    /**
	     * __construct
	     * create navigation
	     */
	    function Nav() {
	        _classCallCheck(this, Nav);

	        this.config = _config2.default.nav;
	        this.Button = new _ButtonClass2.default();
	        this.createTextNav();
	        this.createImageNav();
	    }

	    /**
	     * create navigation element (DOM)
	     * @param String (nav id)
	     * @return Object
	     */


	    _createClass(Nav, [{
	        key: 'element',
	        value: function element(navId) {
	            var elem = document.createElement('nav');
	            elem.id = navId;
	            elem.classList.add(this.config.navClass);

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

	        /**
	         * create navigation for text area
	         */

	    }, {
	        key: 'createTextNav',
	        value: function createTextNav() {
	            var buttons = this.Button.btnTextElement;
	            var navId = this.config.navTextId;
	            this.create(navId, buttons);
	        }

	        /**
	         * create navigation for image area
	         */

	    }, {
	        key: 'createImageNav',
	        value: function createImageNav() {
	            var buttons = this.Button.btnImageElement;
	            var navId = this.config.navImageId;
	            this.create(navId, buttons);
	        }
	    }]);

	    return Nav;
	}();

	exports.default = Nav;

/***/ }
/******/ ]);