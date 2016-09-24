const exports = module.exports;

/**
 * clean base64 string from "data:image/*;base64,"
 * @param String
 */
exports.clean = function(b64){
    return b64.substring(b64.indexOf(',') + 1);
}

/**
 * get image file and return it as base64 data url
 * @param Object (file)
 * @param FN (callback: url: String, file: Object)
 */
exports.image = function(file, callback){
    const reader = new FileReader();
    reader.onload = function(event){
        callback(event.target.result, file);
    }
    reader.readAsDataURL(file);
}