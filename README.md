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
    { r: 189, g: 189, b: 191 } ],
  hex: [ '606337', '6b5536', '78643b', 'bdbdbf' ],
  cmyk: [
    { c: '0.030', m: '0.000', y: '0.444', k: '0.612' },
    { c: '0.000', m: '0.206', y: '0.495', k: '0.580' },
    { c: '0.000', m: '0.167', y: '0.508', k: '0.529' },
    { c: '0.010', m: '0.010', y: '0.000', k: '0.251' }
  ],
  hsl: [
    { h: 65, s: '29%', l: '31%' },
    { h: 36, s: '33%', l: '32%' },
    { h: 41, s: '35%', l: '36%' },
    { h: 240, s: '2%', l: '75%' }
  ],
  css: 'background-image:
    -webkit-radial-gradient(0% 0%, circle, rgb(96, 99, 55), transparent),
    -webkit-radial-gradient(100% 0%, circle, rgb(107, 85, 54), transparent),
    -webkit-radial-gradient(0% 100%, circle, rgb(120, 100, 59), transparent),
    -webkit-radial-gradient(100% 100%, circle, rgb(189, 189, 191), transparent);'
  }

```


Yolo!