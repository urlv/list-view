# list-view
Gives the ability to know when each item entered/left the list view (scroll element)

[demo](https://urlvnbrg.github.io/list-view/)

## Quick Start

Include the script
```html
<script src="listView.min.js"></script>
```

Init the `ListView` with scroll element (list of items)
```js
var scrollDiv = document.querySelector('div');
var lv = new ListView(scrollDiv);
```
Set the function that invoke when item **enterd** to list view
```js
lv.onIn(function(index){
  alert('item number' + index + ' entered to list view!');
}
```

Set the function that invoke when item **left** the list view
```js
lv.onOut(function(index){
  alert('item number' + index + ' left the list view!');
}
```
<br />

We can chain it all together
```js
new ListView(div).onIn(function(x){
  h1.innerHTML = 'item ' + x + ' entered!';
}).onOut(function(x){
  h1.innerHTML = 'item ' + x + ' left!';
});
```

<br />
<br />
## Functions declaration
```js
onIn(functionToInvokeWhenItemEntered)
onOut(functionToInvokeWhenItemLeft)
```
The function have one parameter that indicate the index of element.
You can see how we using it above
