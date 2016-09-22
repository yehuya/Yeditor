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

	var _AjaxClass = __webpack_require__(13);

	var _AjaxClass2 = _interopRequireDefault(_AjaxClass);

	var _SerializeClass = __webpack_require__(14);

	var _SerializeClass2 = _interopRequireDefault(_SerializeClass);

	var _RenderClass = __webpack_require__(17);

	var _RenderClass2 = _interopRequireDefault(_RenderClass);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.selection = new _SelectionClass2.default();
	window.editable = new _EditableClass2.default();
	window.editor = new _EditorClass2.default();
	window.element = new _ElementClass2.default();
	window.ajax = new _AjaxClass2.default();
	window.serialize = new _SerializeClass2.default();
	window.render = new _RenderClass2.default();

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
	         * @return Object | Null
	         */

	    }, {
	        key: 'parent',
	        value: function parent() {
	            var selection = this.get().anchorNode;
	            return selection ? selection.parentElement : null;
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
	 * @for Editable.class.js
	 * @for element/Element.class.js
	 * @for ajax/Serialize.class.js
	 */
	_exports.editable = {
	    htmlTag: 'edit',
	    nameAttr: 'name',
	    typeAttr: 'type'
	};

	/**
	 * @for editor/Nav.class.js
	 */
	_exports.nav = {
	    navClass: prefix + 'nav',
	    navTextId: prefix + 'nav-text',
	    navImageId: prefix + 'nav-image',
	    navMainId: prefix + 'nav-main'
	};

	/**
	 * @for editor/button/*.class.js
	 */
	_exports.button = {
	    btnClass: prefix + 'nav-btn'
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
	                content: this.type(elem) == 'image' ? this.src : this.innerHTML(elem)
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

	var _NavClass = __webpack_require__(6);

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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	var _BtnClass = __webpack_require__(7);

	var _BtnClass2 = _interopRequireDefault(_BtnClass);

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
	        this.Btn = new _BtnClass2.default();
	        this.createTextNav();
	        this.createMainNav();
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
	            var buttons = this.Btn.text;
	            var navId = this.config.navTextId;
	            this.create(navId, buttons);
	        }

	        /**
	         * create navigation for main nav
	         */

	    }, {
	        key: 'createMainNav',
	        value: function createMainNav() {
	            var buttons = this.Btn.nav;
	            var navId = this.config.navMainId;
	            this.create(navId, buttons);
	        }

	        /**
	         * create navigation for image nav
	         */

	    }, {
	        key: 'createImageNav',
	        value: function createImageNav() {
	            var buttons = this.Btn.image;
	            var navId = this.config.navMainId;
	            this.create(navId, buttons);
	        }
	    }]);

	    return Nav;
	}();

	exports.default = Nav;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	var _TextBtnClass = __webpack_require__(8);

	var _TextBtnClass2 = _interopRequireDefault(_TextBtnClass);

	var _NavBtnClass = __webpack_require__(11);

	var _NavBtnClass2 = _interopRequireDefault(_NavBtnClass);

	var _ImageBtnClass = __webpack_require__(15);

	var _ImageBtnClass2 = _interopRequireDefault(_ImageBtnClass);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * editor button class
	 */
	var Btn = function Btn() {
	    _classCallCheck(this, Btn);

	    var text = new _TextBtnClass2.default();
	    var nav = new _NavBtnClass2.default();
	    var image = new _ImageBtnClass2.default();
	    this.text = text.getAllButtons();
	    this.nav = nav.getAllButtons();
	    this.image = image.getAllButtons();
	};

	exports.default = Btn;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	var _SelectionClass = __webpack_require__(1);

	var _SelectionClass2 = _interopRequireDefault(_SelectionClass);

	var _text = __webpack_require__(9);

	var _ButtonClass = __webpack_require__(10);

	var _ButtonClass2 = _interopRequireDefault(_ButtonClass);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * class for Text edit button
	 */
	var TextBtn = function (_Button) {
	    _inherits(TextBtn, _Button);

	    function TextBtn() {
	        _classCallCheck(this, TextBtn);

	        var _this = _possibleConstructorReturn(this, (TextBtn.__proto__ || Object.getPrototypeOf(TextBtn)).call(this));

	        _this.Selection = new _SelectionClass2.default();
	        _this.config = _config2.default.button;
	        _this.btn = _text.text;
	        return _this;
	    }

	    /**
	     * create button elements from array
	     * take the object of button and make it as dom element
	     * @return Array
	     */


	    _createClass(TextBtn, [{
	        key: 'getAllButtons',
	        value: function getAllButtons() {
	            return _get(TextBtn.prototype.__proto__ || Object.getPrototypeOf(TextBtn.prototype), 'getAllButtons', this).call(this, this.btn, this);
	        }

	        /**
	         * create button from btn object
	         * get btn object form this.btn and make it as DOM element
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

	            return _get(TextBtn.prototype.__proto__ || Object.getPrototypeOf(TextBtn.prototype), 'click', this).call(this, button, function () {
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
	            return _get(TextBtn.prototype.__proto__ || Object.getPrototypeOf(TextBtn.prototype), 'addButton', this).call(this, object, this.btn);
	        }
	    }]);

	    return TextBtn;
	}(_ButtonClass2.default);

	exports.default = TextBtn;

/***/ },
/* 9 */
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * parent class for text, image, nav
	 * @parent
	 */
	var Button = function () {
	    function Button() {
	        _classCallCheck(this, Button);
	    }

	    _createClass(Button, [{
	        key: 'addButton',

	        /**
	         * add button to array
	         * @param Object (new button)
	         * @param Array (btn array)
	         */
	        value: function addButton(object, array) {
	            if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) == 'object') {
	                array.push(object);
	            }
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
	                callback();
	            });
	        }

	        /**
	         * create button elements from array
	         * take the object of button and make it as dom element
	         * @param Array
	         * @param Object (this)
	         * @return Array
	         */

	    }, {
	        key: 'getAllButtons',
	        value: function getAllButtons(array, self) {
	            var arr = [];
	            array.forEach(function (element) {
	                arr.push(self.create(element));
	            }, self);

	            return arr;
	        }
	    }]);

	    return Button;
	}();

	exports.default = Button;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	var _nav = __webpack_require__(12);

	var _ButtonClass = __webpack_require__(10);

	var _ButtonClass2 = _interopRequireDefault(_ButtonClass);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * class for main nav button
	 */
	var NavBtn = function (_Button) {
	    _inherits(NavBtn, _Button);

	    function NavBtn() {
	        _classCallCheck(this, NavBtn);

	        var _this = _possibleConstructorReturn(this, (NavBtn.__proto__ || Object.getPrototypeOf(NavBtn)).call(this));

	        _this.btn = _nav.nav;
	        _this.config = _config2.default.button;
	        return _this;
	    }

	    /**
	     * create button elements from array
	     * take the object of button and make it as dom element
	     * @param Array
	     * @return Array
	     */


	    _createClass(NavBtn, [{
	        key: 'getAllButtons',
	        value: function getAllButtons() {
	            return _get(NavBtn.prototype.__proto__ || Object.getPrototypeOf(NavBtn.prototype), 'getAllButtons', this).call(this, this.btn, this);
	        }

	        /**
	         * create button from btn object
	         * get btn object form this.btn and make it as DOM element
	         * @param Object (btn object)
	         * @return Object (DOM element)
	         */

	    }, {
	        key: 'create',
	        value: function create(Object) {
	            var self = this;
	            var name = Object.name || '?';

	            var elem = document.createElement('button');
	            elem.classList.add(this.config.btnClass);
	            elem.title = name;
	            elem.innerText = name;

	            this.click(elem, function () {
	                Object.event();
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
	            return _get(NavBtn.prototype.__proto__ || Object.getPrototypeOf(NavBtn.prototype), 'click', this).call(this, button, callback);
	        }

	        /**
	         * add button
	         * @param Object
	         */

	    }, {
	        key: 'addButton',
	        value: function addButton(object) {
	            return _get(NavBtn.prototype.__proto__ || Object.getPrototypeOf(NavBtn.prototype), 'addButton', this).call(this, object, this.btn);
	        }
	    }]);

	    return NavBtn;
	}(_ButtonClass2.default);

	exports.default = NavBtn;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ElementClass = __webpack_require__(4);

	var _ElementClass2 = _interopRequireDefault(_ElementClass);

	var _EditableClass = __webpack_require__(3);

	var _EditableClass2 = _interopRequireDefault(_EditableClass);

	var _AjaxClass = __webpack_require__(13);

	var _AjaxClass2 = _interopRequireDefault(_AjaxClass);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _exports = module.exports;

	_exports.nav = [
	/**
	 * edit
	 * @CLASS Editable.class.js
	 * @FN set()
	 */
	{
	    name: 'Edit',
	    event: function event() {
	        var editable = new _EditableClass2.default();
	        editable.set();
	    }
	},
	/**
	 * no edit
	 * @CLASS Editable.class.js
	 * @FN set()
	 */
	{
	    name: 'No edit',
	    event: function event() {
	        var editable = new _EditableClass2.default();
	        editable.unset();
	    }
	},
	/**
	 * save
	 * @CLASS Ajax.class.js, Serialize.class.js 
	 * @FN set()
	 */
	{
	    name: 'Save',
	    event: function event() {
	        var ajax = new _AjaxClass2.default();
	        ajax.request().done(function (xhr) {
	            console.log('done', xhr);
	        });
	    }
	}];

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

	var _SerializeClass = __webpack_require__(14);

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
	         * @callback Object (ajax object - xhr)
	         * @return Object (this)
	         */

	    }, {
	        key: 'request',
	        value: function request() {
	            var self = this;
	            var method = self.config.method;
	            this.xhr = new XMLHttpRequest();

	            // open request
	            if (method == 'GET') {
	                this.xhr.open(method, self.config.url + '?' + this.Serialize.GET(), true);
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
	                this.xhr.send(this.Serialize.POST());
	            }

	            return this;
	        }
	    }]);

	    return Ajax;
	}();

	exports.default = Ajax;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ElementClass = __webpack_require__(4);

	var _ElementClass2 = _interopRequireDefault(_ElementClass);

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

	        var elem = new _ElementClass2.default();
	        this.elements = elem.all();
	        this.FromData = new FormData(); // for POST method
	        this.StringData = ''; // for GET method
	        this.config = _config2.default.editable;
	        this.method = _config2.default.ajax.method;
	        // this.blob = Config.ajax.blob;
	    }

	    /**
	     * serialize object for POST ajax method
	     * @return Object
	     */


	    _createClass(Serialize, [{
	        key: 'POST',
	        value: function POST() {
	            this.convert();
	            return this.FromData;
	        }

	        /**
	         * serialize object for GET
	         * @return String
	         */

	    }, {
	        key: 'GET',
	        value: function GET() {
	            this.convert();
	            return this.StringData;
	        }

	        /**
	         * create object from all the editable elements
	         * make base64 image as blob (check by type of the element)
	         * @structure: {element.name : element.content}
	         */

	    }, {
	        key: 'makeBigObject',
	        value: function makeBigObject() {
	            var object = {};

	            this.elements.forEach(function (elem) {
	                var type = elem[this.config.typeAttr];
	                if (type == 'text') {
	                    object[elem.name] = elem.content;
	                } else if (type == 'image') {
	                    // if this.blob are TRUE
	                    // object[name + '<image type>'] = this.blob(elem.content);
	                }
	            }, this);

	            return object;
	        }

	        /**
	         * convert this.makeBigObject into ajax request by this.addData
	         */

	    }, {
	        key: 'convert',
	        value: function convert() {
	            var object = this.makeBigObject();
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

	        /**
	         * sending base64 image as binary
	         */

	    }, {
	        key: 'blob',
	        value: function blob() {}
	    }]);

	    return Serialize;
	}();

	exports.default = Serialize;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	var _SelectionClass = __webpack_require__(1);

	var _SelectionClass2 = _interopRequireDefault(_SelectionClass);

	var _image = __webpack_require__(16);

	var _ButtonClass = __webpack_require__(10);

	var _ButtonClass2 = _interopRequireDefault(_ButtonClass);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * class for Text edit button
	 */
	var ImageBtn = function (_Button) {
	    _inherits(ImageBtn, _Button);

	    function ImageBtn() {
	        _classCallCheck(this, ImageBtn);

	        var _this = _possibleConstructorReturn(this, (ImageBtn.__proto__ || Object.getPrototypeOf(ImageBtn)).call(this));

	        _this.Selection = new _SelectionClass2.default();
	        _this.config = _config2.default.button;
	        _this.btn = _image.image;
	        return _this;
	    }

	    /**
	     * create button elements from array
	     * take the object of button and make it as dom element
	     * @return Array
	     */


	    _createClass(ImageBtn, [{
	        key: 'getAllButtons',
	        value: function getAllButtons() {
	            return _get(ImageBtn.prototype.__proto__ || Object.getPrototypeOf(ImageBtn.prototype), 'getAllButtons', this).call(this, this.btn, this);
	        }

	        /**
	         * get button from btn object
	         * @param Object (btn object)
	         * @return Object (DOM element)
	         */

	    }, {
	        key: 'create',
	        value: function create(Object) {
	            var elem = Object.btn();
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

	            return _get(ImageBtn.prototype.__proto__ || Object.getPrototypeOf(ImageBtn.prototype), 'click', this).call(this, button, function () {
	                if (typeof callback == 'function') {
	                    // check if user selection area is editable
	                    console.log(self.Selection.get().src);
	                    console.log(self.Selection.get().toString());
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
	            return _get(ImageBtn.prototype.__proto__ || Object.getPrototypeOf(ImageBtn.prototype), 'addButton', this).call(this, object, this.btn);
	        }
	    }]);

	    return ImageBtn;
	}(_ButtonClass2.default);

	exports.default = ImageBtn;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _SelectionClass = __webpack_require__(1);

	var _SelectionClass2 = _interopRequireDefault(_SelectionClass);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _exports = module.exports;

	_exports.image = [
	/**
	 * add image
	 */
	{
	    btn: function btn() {
	        var elem = this.dom();
	        this.event(elem);

	        return elem;
	    },
	    event: function event(element) {
	        var selection = new _SelectionClass2.default();
	        element.addEventListener('mousedown', function (e) {
	            e.preventDefault();
	        });
	        element.addEventListener('change', function (event) {
	            var files = event.target.files || event.dataTransfer.files;
	            var reader = new FileReader();

	            console.log(event);
	            for (var i = 0, f; f = files[i]; i++) {
	                reader.onload = function (file) {
	                    return function (event) {
	                        var result = event.target.result;
	                        var img = new Image();
	                        img.src = result;
	                        console.log(img);
	                        selection.append(img);
	                    };
	                }(files[i]);

	                reader.readAsDataURL(files[i]);
	            }
	        });
	    },
	    dom: function dom() {
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
	}];

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * render image object
	 */
	var Render = function () {
	    function Render() {
	        _classCallCheck(this, Render);

	        this.change();
	    }

	    /**
	     * create Image object
	     */


	    _createClass(Render, [{
	        key: 'create',
	        value: function create() {
	            var img = new Image();
	            return img;
	        }

	        /**
	         * add prototype fn to html INPUT element
	         * @event change 
	         * @param FN (callback)
	         */

	    }, {
	        key: 'change',
	        value: function change(callback) {
	            HTMLInputElement.prototype.change = function (callback) {
	                this.addEventListener('change', callback);
	            };
	        }

	        /**
	         * render image
	         */

	    }]);

	    return Render;
	}();

	exports.default = Render;

/***/ }
/******/ ]);