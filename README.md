# Zoomple – simple jQuery plugin for image magnifying

## DEMO
[Check out the Demo](http://sularome.github.io/Zoomple/ "Zoomple demo")

## Settings

Zoomple is a very simple jQuery plugin for image magnifying. It allows you to add a zoom to your image.
Zoomple is tested in : IE7+ , Firefox, Opera and Chrome

* **delay** – Delays the zoom start. Default value: 0
* **zoomWidth** – sets the width of the preview. Default value: 300
* **zoomHeight** – sets the height of the preview. Default value: 300
* **offset** – sets the offset of the thumbnail from the mouse cursor.Default value:  {x : 5,y : 5}
* **loaderURL** - specifies the source for the “loading” image. Default value(images/loader.gif)
* **blankUrl** - specifies the source for the blank image. Default value(images/blank.gif)
* **source** - specifies the source attribute that holds the path to the magnified image. The two possible options are ‘href’ and ‘rel’. Default value is ‘href’
* **attachWindowToMouse** – if set to true, the magnifier will follow the mouse, if set to false, the magnifier will sit attached on the side of the image.
* **windowPosition** – when attachWindowToMouse is set to false, the window will sit on the side of the image. This property defines on which corner of the image, the magnifier will sit (e.g. windowPosition : {x:’right’,y:’bottom’}). Possible values for x: ‘right’, ‘left’. Possible values for y: ‘top’, ‘bottom’.
* **bgColor** - the fill color that should be displayed after the image border
* **roundedCorners** - displays the magnifying glass in circle (so it looks like actual magnifying glass)
* **showCursor** – displays cursor of the middle of the window so you can see where your cursor points on the image 
* **appendTimestamp** – appends timestamp to the url. Default value: true
* **timestamp** – timestamp on init. Default value: (new Date().getTime())

## How to use
```
$('.zoomple').zoomple({ 
			offset : {x:-150,y:-150},
			zoomWidth : 300,  
			zoomHeight : 300,
			roundedCorners : true
		});
```
