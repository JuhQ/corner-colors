(function() {
  var colors;

  colors = require('../index');

  colors.sample('examples/img/thumbnail/2vw5lrp.jpg').then(function(result) {
    return console.log("result", result);
  }).fail(function(error) {
    return console.log("error", error);
  });

}).call(this);
