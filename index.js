(function() {
  var Q, _, createCoordinates, createCss, fs, getAveragePalette, getAverageRGB, getImageInstance, lwip, sample;

  Q = require('q');

  fs = require('fs');

  _ = require('lodash');

  lwip = require('lwip');

  getImageInstance = function(path) {
    return Q.ninvoke(lwip, 'open', path).then(function(image) {
      return {
        image: image,
        path: path
      };
    });
  };

  createCoordinates = function(arg) {
    var height, i, left, results, top, width;
    left = arg.left, top = arg.top, width = arg.width, height = arg.height;
    return _((function() {
      results = [];
      for (var i = left; left <= width ? i <= width : i >= width; left <= width ? i++ : i--){ results.push(i); }
      return results;
    }).apply(this)).map(function(left) {
      var i, results;
      return _.map((function() {
        results = [];
        for (var i = top; top <= height ? i <= height : i >= height; top <= height ? i++ : i--){ results.push(i); }
        return results;
      }).apply(this), function(top) {
        return [left, top];
      });
    }).flatten().value();
  };

  getAverageRGB = function(arg) {
    var coordinates, height, image, left, rgb, top, width;
    image = arg.image, left = arg.left, top = arg.top, width = arg.width, height = arg.height;
    coordinates = createCoordinates({
      left: left,
      top: top,
      width: width,
      height: height
    });
    rgb = _.reduce(coordinates, function(coordinate, arg1) {
      var left, pixel, top;
      left = arg1[0], top = arg1[1];
      pixel = image.getPixel(left, top);
      return _.reduce(coordinate, function(color, value, key) {
        color[key] += pixel[key];
        return color;
      }, coordinate);
    }, {
      r: 0,
      g: 0,
      b: 0
    });
    return _.reduce(rgb, function(color, value, key) {
      color[key] = Math.floor(value / coordinates.length);
      return color;
    }, {});
  };

  getAveragePalette = function(arg) {
    var height, image, matrix, path, rgb, width;
    image = arg.image, path = arg.path;
    width = image.width();
    height = image.height();
    matrix = [[0, 0], [0, 1], [1, 0], [1, 1]];
    rgb = _.map(matrix, function(arg1) {
      var heightMultiplier, widthMultiplier;
      widthMultiplier = arg1[0], heightMultiplier = arg1[1];
      return getAverageRGB({
        image: image,
        left: Math.floor(width / 2 * widthMultiplier),
        top: Math.floor(height / 2 * heightMultiplier),
        width: Math.floor(width / 2),
        height: Math.floor(height / 2)
      });
    });
    return {
      path: path,
      rgb: rgb
    };
  };

  createCss = function(arg) {
    var colors, css, path, rgb;
    path = arg.path, rgb = arg.rgb;
    colors = _.reduce(rgb, function(result, arg1) {
      var b, g, r;
      r = arg1.r, g = arg1.g, b = arg1.b;
      return result.concat("rgb(" + r + ", " + g + ", " + b + ")");
    }, []);
    css = "background-image:\n  -webkit-radial-gradient(0% 0%, circle, " + colors[0] + ", transparent),\n  -webkit-radial-gradient(100% 0%, circle, " + colors[1] + ", transparent),\n  -webkit-radial-gradient(0% 100%, circle, " + colors[2] + ", transparent),\n  -webkit-radial-gradient(100% 100%, circle, " + colors[3] + ", transparent);";
    return {
      path: path,
      rgb: rgb,
      css: css
    };
  };

  sample = function(path) {
    return getImageInstance(path).then(getAveragePalette).then(createCss);
  };

  module.exports = {
    sample: sample
  };

}).call(this);
