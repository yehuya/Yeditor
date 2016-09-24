import Config from './../../config.js';
import Selection from './../Selection.class.js';

/**
 * image class
 */
export default class Image {
    constructor(){
        this.config = Config.image;
        this.create();
    }

    /**
     * create image element
     * @return Object (this.img)
     */
    create(){
        return this.img = document.createElement('img').cloneNode();
    }

    /**
     * append this.img into user selection
     * @param String (url)
     * @return Object (this.img) 
     */
    insert(url){
        var selection = new Selection();
        this.img.src = url;
        selection.append(this.img);
        return this.img;
    }
}