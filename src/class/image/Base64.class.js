/**
 * create image src as base64
 * set base64 as binary
 */
export default class Base64 {
    constructor(){

    }

    /**
     * clean base64 string from "data:image/*;base64,"
     * @param String
     */
    clean(b64){
        return b64.substring(b64.indexOf(',') + 1);
    }
}