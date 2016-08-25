/**
 * all the editor edit button
 * __counstructor
 */
function Edit_btn(){
    return this;
}

/**
 * bold
 * @DOM span
 * @CSS font-weight="bold"
 */
Edit_btn.prototype.bold = function(){
    var element = document.createElement('span');
    element.style.fontWeight = 'bold';

    return element.cloneNode();
}

/**
 * italic
 * @DOM span
 * @CSS font-style="italic"
 */
Edit_btn.prototype.italic = function(){
    var element = document.createElement('span');
    element.style.fontStyle = 'italic';

    return element.cloneNode();
}

/**
 * underline
 * @DOM span
 * @CSS text-decoration="underline"
 */
Edit_btn.prototype.underline = function(){
    var element = document.createElement('span');
    element.style.textDecoration = 'underline';

    return element.cloneNode();
}
