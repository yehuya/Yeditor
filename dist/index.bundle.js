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

	var _EditableClass = __webpack_require__(3);

	var _EditableClass2 = _interopRequireDefault(_EditableClass);

	var _EditorClass = __webpack_require__(5);

	var _EditorClass2 = _interopRequireDefault(_EditorClass);

	var _ElementClass = __webpack_require__(4);

	var _ElementClass2 = _interopRequireDefault(_ElementClass);

	var _AjaxClass = __webpack_require__(10);

	var _AjaxClass2 = _interopRequireDefault(_AjaxClass);

	var _SerializeClass = __webpack_require__(11);

	var _SerializeClass2 = _interopRequireDefault(_SerializeClass);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.selection = new _SelectionClass2.default();
	window.editable = new _EditableClass2.default();
	window.editor = new _EditorClass2.default();
	window.element = new _ElementClass2.default();
	window.ajax = new _AjaxClass2.default();
	window.serialize = new _SerializeClass2.default();

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
	         * @return Object
	         */

	    }, {
	        key: 'parent',
	        value: function parent() {
	            return this.get().anchorNode.parentElement;
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
	                if (parent.tagName.toLowerCase() == this.config.htmlTag.toLowerCase()) {
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
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var _exports = module.exports;
	var prefix = 'frontendEditor-';

	/**
	 * config for Editable.class.js
	 * config for element/Element.class.js
	 */
	_exports.editable = {
	    htmlTag: 'edit',
	    nameAttr: 'name',
	    typeAttr: 'type'
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

	/**
	 * config for ajax/Ajax.class.js
	 */
	_exports.ajax = {
	    url: 'http://localhost',
	    method: 'GET',
	    header: {
	        "Content-Type": "application/x-www-form-urlencoded"
	    },
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

	var _ElementClass = __webpack_require__(4);

	var _ElementClass2 = _interopRequireDefault(_ElementClass);

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
	        this.Element = new _ElementClass2.default();
	    }

	    /**
	     * get all editable area
	     * @extends from 'element/Element.class.js'
	     * @return Array 
	     */


	    _createClass(Editable, [{
	        key: 'get',
	        value: function get() {
	            return this.Element.get();
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
	 * get all editable elements
	 */
	var Element = function () {
	    function Element() {
	        _classCallCheck(this, Element);

	        this.config = _config2.default.editable;
	    }

	    /**
	     * get all editable element - serialize
	     * @return Array of Object
	     */


	    _createClass(Element, [{
	        key: 'all',
	        value: function all() {
	            var arr = [];
	            var elements = this.get();
	            elements.forEach(function (element) {
	                arr.push(this.serialize(element));
	            }, this);

	            return arr;
	        }

	        /**
	         * get all editable elements
	         * @return Array of Object (Node)
	         */

	    }, {
	        key: 'get',
	        value: function get() {
	            var TAG = this.config.htmlTag;
	            return document.querySelectorAll(TAG);
	        }

	        /**
	         * return object of the element with:
	         * - name
	         * - type
	         * - html
	         * @param Object
	         * return Object
	         */

	    }, {
	        key: 'serialize',
	        value: function serialize(elem) {
	            return {
	                name: this.name(elem),
	                type: this.type(elem),
	                html: this.innerHTML(elem)
	            };
	        }

	        /**
	         * get element inner html
	         * @param Object (Node)
	         * @return String
	         */

	    }, {
	        key: 'innerHTML',
	        value: function innerHTML(elem) {
	            return elem.innerHTML;
	        }

	        /**
	         * get element name
	         * @param Object (Node)
	         * @return String
	         */

	    }, {
	        key: 'name',
	        value: function name(elem) {
	            var name = this.config.nameAttr;
	            return elem.getAttribute(name);
	        }

	        /**
	         * get element type
	         * @param Object (Node)
	         * @return String
	         */

	    }, {
	        key: 'type',
	        value: function type(elem) {
	            var type = this.config.typeAttr;
	            return elem.getAttribute(type);
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

	var _ButtonClass = __webpack_require__(6);

	var _ButtonClass2 = _interopRequireDefault(_ButtonClass);

	var _NavClass = __webpack_require__(9);

	var _NavClass2 = _interopRequireDefault(_NavClass);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Editor = function Editor() {
	    _classCallCheck(this, Editor);

	    new _NavClass2.default();
	};

	exports.default = Editor;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	var _TextClass = __webpack_require__(7);

	var _TextClass2 = _interopRequireDefault(_TextClass);

	var _SelectionClass = __webpack_require__(1);

	var _SelectionClass2 = _interopRequireDefault(_SelectionClass);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * editor button class
	 */
	var Button = function Button() {
	    _classCallCheck(this, Button);

	    var text = new _TextClass2.default();
	    this.text = text.getAllButtons();
	};

	exports.default = Button;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	var _SelectionClass = __webpack_require__(1);

	var _SelectionClass2 = _interopRequireDefault(_SelectionClass);

	var _text = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * class for Text edit button
	 */
	var Text = function () {
	    function Text() {
	        _classCallCheck(this, Text);

	        this.Selection = new _SelectionClass2.default();
	        this.config = _config2.default.button;
	        this.btn = _text.text;
	    }

	    /**
	     * create button elements from array
	     * take the object of button and make it as dom element
	     * @param Array
	     * @return Array
	     */


	    _createClass(Text, [{
	        key: 'getAllButtons',
	        value: function getAllButtons() {
	            var arr = [];
	            this.btn.forEach(function (element) {
	                arr.push(this.create(element));
	            }, this);

	            return arr;
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
	         * event onClick on button
	         * @param Object (button)
	         * @param FN (callback function)
	         */

	    }, {
	        key: 'click',
	        value: function click(button, callback) {
	            var self = this;
	            button.addEventListener('click', function (e) {
	                e.preventDefault();
	                if (typeof callback == 'function') {
	                    // check if user selection area is editable
	                    if (self.Selection.parentEditable()) {
	                        callback();
	                    }
	                }
	            });
	        }

	        /**
	         * add button
	         * @param Object
	         */

	    }, {
	        key: 'addButton',
	        value: function addButton(object) {
	            if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) == 'object') {
	                this.btn.push(object);
	            }
	        }
	    }]);

	    return Text;
	}();

	exports.default = Text;

/***/ },
/* 8 */
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

	var _ButtonClass = __webpack_require__(6);

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
	            var buttons = this.Button.text;
	            var navId = this.config.navTextId;
	            this.create(navId, buttons);
	        }
	    }]);

	    return Nav;
	}();

	exports.default = Nav;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	var _SerializeClass = __webpack_require__(11);

	var _SerializeClass2 = _interopRequireDefault(_SerializeClass);

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
	         * create ajax request
	         * - onreadystatechange | done
	         * - onload | success
	         * - onerror | failed
	         * @param String (data for send)
	         * @callback Object (ajax object - xhr)
	         * @return Object (xhr)
	         */

	    }, {
	        key: 'request',
	        value: function request(data) {
	            var self = this;
	            this.xhr = new XMLHttpRequest();

	            // done
	            this.xhr.onreadystatechange = function () {
	                if (self.xhr.readyState == 4) {
	                    if (typeof self.config.done == 'function') {
	                        self.config.done(self.xhr);
	                    }
	                }
	            };

	            // success
	            this.xhr.onload = function () {
	                if (typeof self.config.success == 'function') {
	                    self.config.success(self.xhr);
	                }
	            };

	            // failed
	            this.xhr.onerror = function () {
	                if (typeof self.config.failed == 'function') {
	                    self.config.failed(self.xhr);
	                }
	            };

	            this.xhr.open(self.config.method, self.config.url, true);

	            for (var head in this.config.header) {
	                this.xhr.setRequestHeader(head, this.config.header[head]);
	            }

	            this.xhr.send();
	            return this.xhr;
	        }
	    }]);

	    return Ajax;
	}();

	exports.default = Ajax;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * serialize data for ajax request
	 */
	var Serialize = function () {
	    function Serialize() {
	        _classCallCheck(this, Serialize);
	    }

	    _createClass(Serialize, [{
	        key: 'text',


	        /**
	         * serialize object for sending
	         * @param object
	         * @return String
	         */
	        value: function text(obj) {
	            var string = '';
	            for (var key in obj) {
	                var and = string.length > 0 ? '&' : '';
	                string += and + key + '=' + obj[key];
	            }

	            return string;
	        }
	    }]);

	    return Serialize;
	}();

	exports.default = Serialize;

/***/ }
/******/ ]);