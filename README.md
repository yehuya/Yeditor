# Yeditor
Front-End Editor for web page [DEMO](https://yehuya.github.io/Yeditor/)

## Init
Add Yeditor file into your html file
```html
<head>
  <link rel="stylesheet" href="Yeditor.min.css" />
  <script src="Yeditor.min.js"></script>
</head>
```

Yeditor includes two parts:
* Main function
* Editable elements

### Main function
Initialize Yeditor (add Element prototype and plugin navigations)
```javascript
var Editor = new Yeditor({
  // OPTIONS
});
```

#### Options
* <code>openNavigation:</code> (Boolean) (default: true) - if the main navigation is open in the begining

* <code>uploadImage:</code> (function) (defalut: null) - when the user using images (as backgound or image) what to do with the src (image url) ? if this value is empty (null) - the src will be base64 data url. but if do you want to upload the image to your server and get the url from there, use this function see example below:
```javascript
uploadImage: function(file, callback){
  // Demo jquery ajax 
  // send the @file 
  <SEND THE @FILE TO YOUR SERVER>.then(function(url){
    // the server response is the file url
    // call to @callback fn with @url as argument
    callback(url);
  });
}
```

* <code>url:</code> (String) (default: null) - the ajax url (for save function) - if this value is empty (null) the save button will stay hidden and dont show up

* <code>method:</code> (String) (default: 'POST') the ajax request method

* <code>done:</code> (Function) (defalut: null) the ajax requset <b>done</b> status

* <code>success:</code> (Function) (defalut: null) the ajax requset <b>success</b> status

* <code>failed:</code> (Function) (defalut: null) the ajax requset <b>failed</b> status

* <code>navMainOrder:</code> (Array) (defalut: null) the order of <b>main</b> navigation button the order is by buttons name (use navigation api), (optional: insert html into the navigation). see example below:
```javascript
// regular order
navMainOrder: ['button 1', 'button 2']

// with html
navMainOrder: ['button 1', 'button 2', ['<span>THE HTML NEED TO BE INSIDE ARRAY</span>'], 'button 3']

** IMPORTANT **
You must use in the button name for this options, 
get all the navigation buttons name by using the api

```

* <code>navImageOrder:</code> the order of <b>image</b> navigation - use it same as <code>navMainOrder</code>

* <code>navBackgroundOrder:</code> the order of <b>background</b> navigation - use it same as <code>navMainOrder</code>

### Editable function
For editing Element:
```javascript
// element
var title = document.getElementById('title');

// edit
title.editable({
  // OPTIONS
});
```

#### Options
* <code>name:</code> (String) (default: null) the name of the editable element. the name is 'key', the 'value' = this element content, for ajax request - sending it to the server

## Api
How to take Yeditor into your system, use it as you wish..

### How it works
Yeditor api exists in the main function. example:
```javascript
var Yeditor = new Yeditor();
var Api = Yeditor.api;
```
Now <code>Api</code> reffer to Yeditor api

### Ajax
This class send the editable area content into your server
```javascript
Api.ajax;
```

#### addParam(Object)
Add data to ajax request - sending this data with save request<br />
<code>@Object</code>
```javascript
Api.ajax.addParam({name: '<DATA-KEY>', value: '<DATA-VALUE>'});
```

### Code
For 'code' button in the main navigation - we are using [CodeMirror](https://codemirror.net/) so the api expose to you the CodeMirror options of the code button (codemirror) element
```javascript
// the CodeMirror options will show up
Api.code
```

### Navigation
Yeditor has three navigation 
* Main - exists at the top of the screen
* Image - exists on each image (when image clicked)
* Background - exists on each element with background (focus on the element)

The api options exists for all the navigation but each nav has own endpoint.
```javascript
// navigation endpoint for using api options

// Main
Api.navigation.main

// Image 
Api.navigation.image

// Background
Api.navigation.background

```

#### element()
Return the navigation dom element

#### getAllButtonsName()
Get all the buttons name in the navigation<br />
(helpfull for order the nav in Yeditor main function)

#### addButton(BUTTON_OBJECT)
Add custom button into the navigation

<code>@param Object</code> - user guide:

```javascript
{
  name: // button name
  description: // what the button does - in short 
  class: // button class use Array ([]) for multiple classes - OPTIONAL
  text: // insert text into the button - OPTIONAL
  id: // button id - OPTIONAL
  element: // button element - DOM (it can be function thet return element) - OPTIONAL
  event: [// button event
    {
      name: // event name, example: 'click', 'change' - use the origin addEventListener name
      fn: // the function itself (what will happen)
    }
    // you can add multiple event
  ]
}
```

### Selection
Do something with user selection
```javascript
// for get the current user selection you need to call it like this:
var Selection = new Api.selection();

// now you can use the api selection functions with the Selection variable
```

#### get()
return user selection object

#### text()
return user selection text 

#### parent()
return user selection area parent element 

#### parentEditable()
Check if the parent of the selection area is editable<br />
return <code>false</code> if the parent is not editable

#### insert(Node)
Insert element into the current location of the user selection<br />
<code>@Node</code> is Node element 

#### remove()
remove the user selection<br />
return <code>document fragment node</code>

#### append(FN)
Take user selection text and append it into new element - usefull for bold / underline etc..<br />
How <code>@FN</code> works:
```javascript
Selection.append(function(text){
  var bold = document.createElement('span');
  bold.style.fontWeight = 'bold';
  bold.innerText = text; // the user selection text - from @text argument
  
  return bold.cloneNode(true);
});
```

### Image
Helpfull functions for using in images with Yeditor
```javascript
Api.image
```

#### base64(file, callback)
 get image file and return it as base64 data url<br />
 <code>@file</code> the image file<br />
 <code>@callback</code> (function) callback with 2 arguments 
 * <code>@url</code>
 * <code>@file</code>
 example: 
 ```javascript
 var imgFile = <IMAGE-FILE>;
 var base64 = Api.image.base64(imgFile, function(url, file){
  // @url - file base64 data-url
  // @file - the original image file @imgFile
 }1)
 ```
