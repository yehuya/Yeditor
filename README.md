![Yeditor](https://yehuya.github.io/Yeditor/images/Yeditor-100.png)

# Yeditor
Front-End Editor for web page<br />
* [Yeditor site](https://yehuya.github.io/Yeditor/)
* [DEMO (playground)](https://yehuya.github.io/Yeditor/demo.html)
* [Api](API.md)

#### npm 
```bash
$npm install yeditor --save
```

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
