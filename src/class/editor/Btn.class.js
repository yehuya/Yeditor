import Config from './../../config.js';
import Text from './button/TextBtn.class.js';
import Nav from './button/NavBtn.class.js';

/**
 * editor button class
 */
export default class Btn {
    constructor(){
        var text = new Text();
        var nav = new Nav();
        this.text = text.getAllButtons();
        this.nav = nav.getAllButtons();
    }
}