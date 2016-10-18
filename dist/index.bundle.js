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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.Editor = _EditorClass2.default;

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

	var _NavigationClass = __webpack_require__(4);

	var _NavigationClass2 = _interopRequireDefault(_NavigationClass);

	var _Image = __webpack_require__(6);

	var _Image2 = _interopRequireDefault(_Image);

	var _Base = __webpack_require__(10);

	var _Base2 = _interopRequireDefault(_Base);

	var _SelectionClass = __webpack_require__(7);

	var _SelectionClass2 = _interopRequireDefault(_SelectionClass);

	var _Buttons = __webpack_require__(11);

	var _Buttons2 = _interopRequireDefault(_Buttons);

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

	    window.Element.prototype[_config2.default.editable.prototype] = this.editable;

	    var mainNav = new _NavigationClass2.default(_Buttons2.default.get(), _config2.default.nav.id);

	    if (options['uploadImage']) _config2.default.image.uploadImage = options.uploadImage;
	    if (options['uploadBackground']) _config2.default.image.uploadBackground = options.uploadBackground;
	    if (options['url']) _config2.default.ajax.url = options.url;
	    if (options['method']) _config2.default.ajax.method = options.method;
	    if (options['done']) _config2.default.ajax.done = options.done;
	    if (options['success']) _config2.default.ajax.success = options.success;
	    if (options['failed']) _config2.default.ajax.failed = options.failed;

	    this.api = {
	      image: _Image2.default,
	      base64: _Base2.default,
	      selection: _SelectionClass2.default,
	      navigation: mainNav
	    };

	    return this;
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
	 * @for button/image.array.js
	 */
	_exports.image = {
	    uploadImage: null, //function(file){console.log(file)},
	    uploadBackground: null
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

	var _ButtonClass = __webpack_require__(5);

	var _ButtonClass2 = _interopRequireDefault(_ButtonClass);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Navigation = function () {

	    /**
	     * __construct
	     * create navigation
	     */
	    function Navigation(buttons, id) {
	        _classCallCheck(this, Navigation);

	        this.config = _config2.default.nav;
	        this.buttons = buttons;
	        this.id = id;
	        this.nav;

	        this.create();
	    }

	    /**
	     * create navigation element (DOM)
	     * @return Object
	     */


	    _createClass(Navigation, [{
	        key: 'element',
	        value: function element() {
	            this.nav = document.createElement('nav');
	            this.nav.id = this.id;
	            this.nav.classList.add(this.config.class);

	            return this.nav;
	        }

	        /**
	         * insert nav element into the document.body
	         * @param Object (DOM element)
	         */

	    }, {
	        key: 'insertIntoBody',
	        value: function insertIntoBody() {
	            return document.body.appendChild(this.nav);
	        }

	        /**
	         * append DOM element into the nav 
	         * @param Object (nav element)
	         * @param Object (DOM element)
	         */

	    }, {
	        key: 'append',
	        value: function append(Node) {
	            return this.nav.appendChild(Node);
	        }

	        /**
	         * insert edit button into nav
	         * @param Object (nav element)
	         * @param Array (buttons)
	         */

	    }, {
	        key: 'insertEditButtons',
	        value: function insertEditButtons() {
	            this.buttons.forEach(function (element) {
	                this.append(element);
	            }, this);
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
	        value: function create() {
	            this.element();
	            this.insertEditButtons();
	            this.insertIntoBody();
	        }

	        /**
	         * add button into the navigation
	         * @param Object
	         */

	    }, {
	        key: 'addButton',
	        value: function addButton(object) {
	            var btn = new _ButtonClass2.default(object);
	            this.append(btn);
	        }
	    }]);

	    return Navigation;
	}();

	exports.default = Navigation;

/***/ },
/* 5 */
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
	 * Create button element from object
	 * @example button object 
	 * {
	 *   @name: 'test', // btn name
	 *   @description: 'test btn', // btn description - for title tag - optional
	 *   @class: 'test-btn', // add class to this btn - optional
	 *   @text: 'test', // insert text into the btn - optional
	 *   @id: 'test-btn', // add id to this btn - optional
	 *   @element: document.createElement('button').cloneNode(), // btn element - optional
	 *   @event: [
	 *             {
	 *                 @name: 'click',
	 *                 @fn: function(){
	 *                     console.log('test');
	 *                 }
	 *             }
	 *         ],// btn event || for multiple event use []
	 * }
	 */

	var Button = function () {

	    /**
	     * __construct
	     * @param Object (button)
	     * @return Object (Node element)
	     */
	    function Button(btn) {
	        _classCallCheck(this, Button);

	        this.config = _config2.default.button;

	        return this.create(btn);
	    }

	    /**
	     * create btn from object 
	     * @param Object
	     * @property name, description, class, text, id, element, event 
	     * @return Object
	     */


	    _createClass(Button, [{
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

	exports.default = Button;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	var _SelectionClass = __webpack_require__(7);

	var _SelectionClass2 = _interopRequireDefault(_SelectionClass);

	var _Base = __webpack_require__(10);

	var _Base2 = _interopRequireDefault(_Base);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * image helper function 
	 */

	var _exports = module.exports;

	/**
	 * append this.img into user selection
	 * @param String (url)
	 * @return Object (this.img) 
	 */
	_exports.insertImage = function (url) {
	    var selection = new _SelectionClass2.default();
	    var img = document.createElement('img');
	    img.src = url;

	    selection.insert(img);
	    return img;
	};

	_exports.insertBackground = function (url) {
	    var selection = new _SelectionClass2.default();
	    var parent = selection.parent();

	    parent.style.backgroundImage = 'url(' + url + ')';
	    return parent;
	};

	_exports.uploadBackground = function (file) {
	    if (typeof _config2.default.image.uploadBackground == 'function') {
	        _config2.default.image.uploadBackground(file);
	    } else {
	        _Base2.default.image(file, function (url, file) {
	            _exports.insertBackground(url);
	        });
	    }
	};

	_exports.uploadImage = function (file) {
	    if (typeof _config2.default.image.uploadImage == 'function') {
	        _config2.default.image.uploadImage(file);
	    } else {
	        _Base2.default.image(file, function (url, file) {
	            _exports.insertImage(url);
	        });
	    }
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _process = __webpack_require__(8);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * class for user selection
	 */
	var Selection = function () {
	    function Selection() {
	        _classCallCheck(this, Selection);

	        this.selected = this.get();
	        this.range = this.selected ? this.selected.getRangeAt(0) : false;
	    }

	    /**
	     * get user selection
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
	         * get selected text
	         */

	    }, {
	        key: 'text',
	        value: function text() {
	            return this.selected ? this.selected.toString() : null;
	        }

	        /**
	         * insert user selection into new element
	         * and remove the old selection
	         * @param FN (in the fn you create element with the text of the user selection)
	         * @example function bold(text){
	         *   var b = document.createElement('span');
	         *   b.style.fontWeight = 'bold';
	         * 
	         *   text = document.createTextNode(text).cloneNode(true);
	         *   b.appendChild(text);
	         *  
	         *   return b.cloneNode(true); 
	         * }
	         */

	    }, {
	        key: 'append',
	        value: function append(FN) {
	            if (!this.selected || this.selected.type == 'Caret' || !this.range) return;
	            (0, _process.process)(this.range, FN);
	        }

	        /**
	         * insert element in the start position of the user selection
	         * only insert without delete or get user selection text
	         * @param Object (Node element)
	         */

	    }, {
	        key: 'insert',
	        value: function insert(Node) {
	            if (!this.range) return;

	            this.range.insertNode(Node);
	        }

	        /**
	         * remove user selection text and element
	         * @return Object (DocumentFragment)
	         */

	    }, {
	        key: 'remove',
	        value: function remove() {
	            if (!this.range) return;
	            return this.range.extractContents();
	        }

	        /**
	         * get parent element of user selection
	         * @return Object | Null
	         */

	    }, {
	        key: 'parent',
	        value: function parent() {
	            var selection = this.selected.anchorNode;
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

	    return Selection;
	}();

	exports.default = Selection;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * import helper function for the process
	 */

	var _append = __webpack_require__(9);

	var _exports = module.exports;

	/**
	 * important vars for the process flow
	 */
	var _CONTINUE;
	var _END_CONTAINER;
	var _HAS_CHILDREN;
	var _BREAK_WHILE;

	/**
	 * the main process function
	 * get the user selection and append it into new element
	 * @param Object (user selection)
	 * @param FN (what to do with the selection)
	 */
	_exports.process = function (range, FN) {
	    var data = rangeData(range, FN);
	    _CONTINUE = true;

	    // same element
	    level1(data);
	    if (!_CONTINUE) return;

	    // not the same element
	    // refresh sibling after the first appendFromTo fn
	    // prevent junk sibling
	    level2(data);
	    if (!_CONTINUE) return;

	    // only 'one' element between end & start
	    level3(data);
	    if (!_CONTINUE) return;

	    // get all the element between
	    level4(data);
	};

	/**
	 * same element
	 * @param Object (range data)
	 */
	function level1(data) {
	    if (data.start == data.end) {
	        (0, _append.appendFromTo)(data.start, data.offset.start, data.offset.end, data.fn);
	        _CONTINUE = false;
	    }
	}

	/*
	 * not the same element
	 * refreshSibling
	 * @param Object (range data)
	 */
	function level2(data) {
	    var startElement = (0, _append.appendFromTo)(data.start, data.offset.start, null, data.fn);
	    var endElement = (0, _append.appendFromTo)(data.end, null, data.offset.end, data.fn);

	    refreshSibling(data);

	    if (endElement.parentElement && data.sibling.start == endElement.parentElement || data.sibling.end == startElement) _CONTINUE = false;
	}

	/*
	 * only 'one' element between end & start
	 * @param Object (range data)
	 */
	function level3(data) {
	    if (data.sibling.start == data.sibling.end && data.sibling.start != null) {

	        var siblingStartChild = children(data.sibling.start, function (elem) {
	            (0, _append.append)(elem, data.fn);
	        });

	        if (!siblingStartChild) (0, _append.append)(data.sibling.start, data.fn);

	        _CONTINUE = false;
	    }
	}

	/*
	 * get all the element between
	 * @param Object (range data)
	 */
	function level4(data) {
	    var next = data.sibling.start;
	    var child, isTheEndContainer;

	    _BREAK_WHILE = false;

	    while (next) {

	        _END_CONTAINER = false;
	        _HAS_CHILDREN = false;

	        // check if next have children
	        level4_1(data, next);

	        // ### no children
	        next = level4_2(data, next);

	        // ### break
	        level4_3b(data, next);
	        if (_BREAK_WHILE) break;

	        level4_4b(data, next);
	        if (_BREAK_WHILE) break;

	        // ### next while
	        next = preventEmptySibling(next.nextSibling) || next.nextElementSibling;
	    }
	}

	/**
	 * while: children
	 * @param Object (range data)
	 * @param Object (Node element)
	 */
	function level4_1(data, next) {
	    var child = children(next, function (elem) {
	        if (!_END_CONTAINER) (0, _append.append)(elem, data.fn);
	        if (elem == data.sibling.end) _END_CONTAINER = true;
	    });

	    return child ? _HAS_CHILDREN = true : _HAS_CHILDREN = false;
	}

	/**
	 * while: no-children
	 * @param Object (range data)
	 * @param Object (Node element)
	 * @return Object (Node element)
	 */
	function level4_2(data, next) {
	    return !_HAS_CHILDREN && !_END_CONTAINER ? next = (0, _append.append)(next, data.fn) : next;
	}

	/**
	 * while: break
	 * @param Object (range data)
	 * @param Object (Node element)
	 */
	function level4_3b(data, next) {
	    if (data.sibling.end && next == data.sibling.end.toString()) {
	        if (data.end.textContent.toString().substring(0, data.offset.end) == next.textContent) _BREAK_WHILE = true;
	    }
	}

	/**
	 * while: break
	 * @param Object (range data)
	 * @param Object (Node element)
	 */
	function level4_4b(data, next) {
	    if (next == data.sibling.end || _END_CONTAINER) _BREAK_WHILE = true;
	}

	/**
	 * order the range (user selection) object for the process function
	 * @param Object (range)
	 * @param FN (what to do with the selection)
	 * @return Object
	 */
	function rangeData(range, FN) {
	    return {
	        start: range.startContainer,
	        end: range.endContainer,
	        offset: {
	            start: range.startOffset,
	            end: range.endOffset
	        },
	        sibling: {
	            start: range.startContainer.nextSibling,
	            end: range.endContainer.previousSibling
	        },
	        range: range,
	        fn: FN
	    };
	}

	/**
	 * refresh range sibling after the first appendFromTo fn 
	 * @param Object (range data)
	 * @return Object (range data)
	 */
	function refreshSibling(data) {
	    if (data.sibling.start == null) data.sibling.start = preventEmptySibling(data.range.startContainer.nextSibling) || data.range.startContainer.nextElementSibling;
	    if (data.sibling.end == null) data.sibling.end = preventEmptySibling(data.range.endContainer.previousSibling) || data.range.endContainer.previousElementSibling;

	    return data;
	}

	/**
	 * prevent empty sibling 
	 * if empty return Null
	 * @param Object (Node)
	 * @return Object || Null
	 */
	function preventEmptySibling(elem) {
	    return elem && elem.nodeType == 3 && elem.data && elem.data.trim().length == 0 ? null : elem;
	}

	/**
	 * get all the children of current element
	 * - set callback fn on each child
	 * @param Object (Node)
	 * @param FN (callback function - what to do with the child)
	 */
	function children(node, callback) {
	    var child = node.childNodes;
	    child.forEach(function (element) {
	        element.children ? children(element, callback) : callback(element);
	    }, this);

	    return child.length > 0 ? child : false;
	}

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	var _exports = module.exports;

	/**
	 * helper fn for appendFromTo
	 * insert all the element into new element (@from = null, @to = null)
	 * @param Object (Node)
	 * @param FN (append the element)
	 * @return Object (Node)
	 */
	_exports.append = function (node, FN) {
	  return _exports.appendFromTo(node, null, null, FN);
	};

	/**
	 * append part from element into new element
	 * @param Object (Node)
	 * @param Number || Null (offset start, null = 0)
	 * @param Number || Null (offset end, null = node.length)
	 * @param FN (append the important part into new element - this happend in FN)
	 * @return Object (the important part - Node)
	 */
	_exports.appendFromTo = function (node, from, to, FN) {
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
	};

	/**
	 * create Text node
	 * @param String 
	 * @return Object (text node)
	 */
	function createTextNode(text) {
	  return document.createTextNode(text).cloneNode(true);
	}

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

	"use strict";

	var _ButtonClass = __webpack_require__(5);

	var _ButtonClass2 = _interopRequireDefault(_ButtonClass);

	var _imageArray = __webpack_require__(12);

	var _navArray = __webpack_require__(13);

	var _textArray = __webpack_require__(16);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _exports = module.exports;

	/**
	 * get all button object from the default array
	 * create Node element from each btn object
	 * insert new button element into array of btn elements
	 * @return Array of Object (btn elements)
	 */
	_exports.get = function () {
	    var allArrayOfTheBtn = [].concat(_imageArray.image, _navArray.nav, _textArray.text);
	    var readyBtn = [];

	    allArrayOfTheBtn.forEach(function (object) {
	        var btn = new _ButtonClass2.default(object);
	        readyBtn.push(btn);
	    }, this);

	    return readyBtn;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Image = __webpack_require__(6);

	var _Image2 = _interopRequireDefault(_Image);

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
	            _Image2.default.uploadImage(files[0]);

	            this.getElementsByTagName('input')[0].value = ''; // clone the input for new image
	        }
	    }]
	},
	/**
	 * add background  
	 */
	{
	    name: 'Add background',
	    text: 'Add background',
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
	            _Image2.default.uploadBackground(files[0]);

	            this.getElementsByTagName('input')[0].value = ''; // clone the input for new image
	        }
	    }]
	}];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _AjaxClass = __webpack_require__(14);

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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	var _SerializeClass = __webpack_require__(15);

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
	         * - get editable element data
	         * - serialize data
	         * @callback Object (ajax object - xhr)
	         * @return Object (this)
	         */

	    }, {
	        key: 'request',
	        value: function request() {
	            var self = this;
	            var elements = document.querySelectorAll('[' + _config2.default.editable.attribute.plugin + ']');
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
/* 15 */
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _SelectionClass = __webpack_require__(7);

	var _SelectionClass2 = _interopRequireDefault(_SelectionClass);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	                text = document.createTextNode(text).cloneNode(true);
	                b.appendChild(text);

	                return b.cloneNode(true);
	            };

	            var unbold = function unbold(text) {
	                var b = document.createElement('span');
	                b.style.fontWeight = 'normal';

	                text = document.createTextNode(text).cloneNode(true);
	                b.appendChild(text);

	                return b.cloneNode(true);
	            };

	            var selection = new _SelectionClass2.default();

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

	                text = document.createTextNode(text).cloneNode(true);
	                i.appendChild(text);

	                return i.cloneNode(true);
	            };

	            var unitalic = function unitalic(text) {
	                var i = document.createElement('span');
	                i.style.fontStyle = 'normal';

	                text = document.createTextNode(text).cloneNode(true);
	                i.appendChild(text);

	                return i.cloneNode(true);
	            };

	            var selection = new _SelectionClass2.default();

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

	                text = document.createTextNode(text).cloneNode(true);
	                u.appendChild(text);

	                return u.cloneNode(true);
	            };

	            var ununderline = function ununderline(text) {
	                var u = document.createElement('span');
	                u.style.textDecoration = 'none';

	                text = document.createTextNode(text).cloneNode(true);
	                u.appendChild(text);

	                return u.cloneNode(true);
	            };

	            var selection = new _SelectionClass2.default();

	            var parent = selection.parent();
	            if (parent && parent.style.textDecoration == 'underline') {
	                if (parent.textContent.trim() == selection.text().trim()) return parent.style.textDecoration = 'none';
	                return selection.append(ununderline);
	            }

	            selection.append(underline);
	        }
	    }
	}];

/***/ }
/******/ ]);