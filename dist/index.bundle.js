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

	var Selection = __webpack_require__(1).default;
	var Editable = __webpack_require__(2).default;
	var Editor = __webpack_require__(4).default;

	window.selection = new Selection();
	window.editable = new Editable();
	window.editor = new Editor();

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
	                range.surroundContents(Node);
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
	  navClass: prefix + 'area-nav',
	  navId: prefix + 'nav'
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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _config = __webpack_require__(3);

	var _config2 = _interopRequireDefault(_config);

	var _button = __webpack_require__(6);

	var _button2 = _interopRequireDefault(_button);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * editor button class
	 */
	var Button = function () {
	    function Button() {
	        _classCallCheck(this, Button);

	        this.btn_image = _button2.default.image;
	        this.btn_text = _button2.default.text;
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
	    }]);

	    return Button;
	}();

	exports.default = Button;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	var _exports = module.exports;

	_exports.text = [];

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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Nav = function () {

	    /**
	     * __construct
	     */
	    function Nav() {
	        _classCallCheck(this, Nav);

	        this.config = _config2.default.nav;
	        this.appendToDocument(this.element());
	    }

	    /**
	     * create main navigation element (DOM)
	     * @return Object
	     */


	    _createClass(Nav, [{
	        key: 'element',
	        value: function element() {
	            var element = document.createElement('nav');
	            element.classList.add(this.config.navClass);
	            element.id = this.config.navId;

	            return element;
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
	    }]);

	    return Nav;
	}();

	exports.default = Nav;

/***/ }
/******/ ]);