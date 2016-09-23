import Config from './../config.js';
import Text from './button/TextBtn.class.js';
import Nav from './button/NavBtn.class.js';
import Image from './button/ImageBtn.class.js';

/**
 * editor button class
 */
export default class Btn {
    constructor(){
        var text = new Text();
        var nav = new Nav();
        var image = new Image();
        this.text = text.getAllButtons();
        this.nav = nav.getAllButtons();
        this.image = image.getAllButtons();
    }
}