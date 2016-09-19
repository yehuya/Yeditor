/**
 * serialize data for ajax request
 */
export default class Serialize {

    /**
     * serialize object for sending
     * @param object
     * @return String
     */
    text(obj){
        var string = '';
        for(let key in obj){
            let and = string.length > 0 ? '&' : '';
            string += and + key + '=' + obj[key]; 
        }

        return string;
    }
} 