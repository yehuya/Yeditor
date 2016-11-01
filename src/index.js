"use strict";

/**
 * entry point
 */

// add babel polyfill 
import "babel-polyfill";

// add main style file
require('./css/style.scss');

// add font-awesome style (its helpful with the button)
require('font-awesome/css/font-awesome.css');

// import the main class
import Editor from './js/Editor.class.js';

// expose the class to window scope
window.Yeditor = Editor;
