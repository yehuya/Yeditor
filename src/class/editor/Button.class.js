import Config from './../../config.js';
import Text from './button/Text.class.js';
import Selection from './../Selection.class.js';

/**
 * editor button class
 */
export default class Button {
    constructor(){
        var text = new Text();
        this.text = text.getAllButtons();
    }
}