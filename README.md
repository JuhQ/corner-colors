### Corner colors

```
var colors = require('corner-colors');
colors.sample('file.jpg').then(function(result) {
  console.log('result', result);
});
```


Result:
```
{
  path: 'examples/img/thumbnail/2vw5lrp.jpg',
  rgb: [
    { r: 96, g: 99, b: 55 },
    { r: 107, g: 85, b: 54 },
    { r: 120, g: 100, b: 59 },
    { r: 189, g: 189, b: 191 }
  ],
  css: 'background-image:
    -webkit-radial-gradient(0% 0%, circle, rgb(96, 99, 55), transparent),
    -webkit-radial-gradient(100% 0%, circle, rgb(107, 85, 54), transparent),
    -webkit-radial-gradient(0% 100%, circle, rgb(120, 100, 59), transparent),
    -webkit-radial-gradient(100% 100%, circle, rgb(189, 189, 191), transparent);'
}
```


Yolo!