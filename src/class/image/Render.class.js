/**
 * render image object
 */
export default class Render {
    constructor(){
        this.change();
    }

    /**
     * create Image object
     */
    create(){
        var img = new Image();
        return img;
    }

    /**
     * add prototype fn to html INPUT element
     * @event change 
     * @param FN (callback)
     */
    change(callback){
        HTMLInputElement.prototype.change = function(callback){
            this.addEventListener('change', callback);
        } 
    }

    /**
     * render image
     */
}