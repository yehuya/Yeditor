
# Yeditor Api
How to take Yeditor into your system, use it as you wish..

## How it works
Yeditor api exists in the main function. example:
```javascript
var Yeditor = new Yeditor();
var Api = Yeditor.api;
```
Now <code>Api</code> reffer to Yeditor api

## Ajax
This class send the editable area content into your server
```javascript
Api.ajax;
```

### addParam(Object)
Add data to ajax request - sending this data with save request<br />
<code>@Object</code>
```javascript
Api.ajax.addParam({name: '<DATA-KEY>', value: '<DATA-VALUE>'});
```

## Code
For 'code' button in the main navigation - we are using [CodeMirror](https://codemirror.net/) so the api expose to you the CodeMirror options of the code button (codemirror) element
```javascript
// the CodeMirror options will show up
Api.code
```

## Navigation
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

## Selection
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

## Image
Helpfull functions for using in images with Yeditor
```javascript
Api.image
```

#### base64(file, callback)
 Get image file and return it as base64 data url<br />
 <code>@file</code> the image file<br />
 <code>@callback</code> (function) callback with 2 arguments (url, file)

 example: 
 
 ```javascript
 var imgFile = <IMAGE-FILE>;
 var base64 = Api.image.base64(imgFile, function(url, file){
  // @url - file base64 data-url
  // @file - the original image file @imgFile
 });
 ```
 
 
#### addBackground(url, element)
Add element background image <br />
<code>@url</code> background image url<br />
<code>@element</code> Node element - the element

#### insertImageIntoUserSelection(url)
Insert new image into user selection location<br />
<code>@url</code> Image url

#### getURL(file, callback)
Get image or backround url by the user definition (Main function options - uploadImage)<br />
If <code>uploadImage</code> option is <b>not</b> empty (null) - get the file url from your server (by uploadImage fn)<br />
Else return file url as base64<br />
<code>@file</code> the image file<br />
<code>@callback</code> (function) callback with 1 argument (url)

example:

```javascript
var imgFile = <IMAGE-FILE>;
Api.image.getURL(imgFile, function(url){
  var img = document.createElement('img');
  img.src= url;

  document.body.appendChild(img);
});
```

## Edit image navigation
Image navigation api<br />
```javascript
Api.edit.image
```

#### getNavigation()
return navigation dom element

#### show(img)
Show navigation above the current <code>@img</code>

#### hide()
Hide navigation

#### setImage(img)
Set <code>@img</code> editable by the navigation<br />
<code>@img</code> image dom element

#### setAllImages(element)
Set all images inside the <code>@element</code> as editable by the navigation<br />
<code>@element</code> The parent dom element - all element children will be editable

#### getCurrentImage()
return the current editable image

#### setCurrentImage(img)
Set <code>@img</code> as the current editable image<br />
<code>@img</code> image dom element

#### removeCurrentImage()
Remove current editing image (remove only the class attribute - that mean it is the current editable image)

## Edit background navigation
Background navigation api<br />
```javascript
Api.edit.background
```

#### getNavigation()
return navigation dom element

#### show(bg)
Show navigation above the current <code>@bg</code> element<br />
<code>@bg</code> The element with backgound

#### hide()
Hide navigation

#### setBackground(bg)
Set <code>@bg</code> editable by the navigation<br />
<code>@bg</code> dom element with background

#### setAllbackground(element)
Set all backgrounds inside the <code>@element</code> as editable by the navigation<br />
<code>@element</code> The parent dom element - all element children will be editable

#### getCurrentBackground()
return the current editable background

#### setCurrentBackground(bg)
Set <code>@bg</code> as the current editable background<br />
<code>@bg</code> dom element with background

#### removeCurrentBackground()
Remove current editing background (remove only the class attribute - that mean it is the current editable background)
