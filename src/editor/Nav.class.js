import Config from './../config.js';

export default class Nav {

    /**
     * __construct
     * create navigation
     */
    constructor(){
        this.config = Config.nav;
        this.create();
    }

    /**
     * create main navigation element (DOM)
     * @return Object
     */
    element(){
        var elem = document.createElement('nav');
        elem.id = this.config.navId;
        elem.classList.add(this.config.navClass);

        return elem;
    }

    /**
     * append DOM element into the document.body
     * @param Object (DOM element)
     */
    appendToDocument(Node){
        document.body.appendChild(Node);
    }

    /**
     * create navigation
     */
    create(){
        this.appendToDocument(this.element());
    }

    /**
     * refresh the navigation
     * remove nav
     * create nav
     */
    refresh(){
        this.element().parentNode.removeChild(this.element());
        this.create();
    }
}