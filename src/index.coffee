Q = require('q')
fs = require('fs')
_ = require('lodash')
lwip = require('lwip')

getImageInstance = (path) ->
  Q.ninvoke(lwip, 'open', path)
    .then (image) ->
      {image, path}


createCoordinates = ({left, top, width, height}) ->
  _([left..width]).map (left) ->
    _.map [top..height], (top) ->
      [left, top]
  .flatten()
  .value()


getAverageRGB = ({image, left, top, width, height}) ->
  coordinates = createCoordinates(({left, top, width, height}))

  rgb = _.reduce coordinates, (coordinate, [left, top]) ->
    pixel = image.getPixel(left, top)
    _.reduce coordinate, (color, value, key) ->
      color[key] += pixel[key]
      color
    , coordinate
  , {r: 0, g: 0, b: 0}

  _.reduce rgb, (color, value, key) ->
    color[key] = Math.floor(value / coordinates.length)
    color
  , {}


getAveragePalette = ({image, path}) ->
  width = image.width()
  height = image.height()

  matrix = [
    [0, 0], [0, 1]
    [1, 0], [1, 1]
  ]

  rgb = _.map matrix, ([widthMultiplier, heightMultiplier]) ->
    getAverageRGB({
      image
      left: Math.floor(width / 2 * widthMultiplier)
      top: Math.floor(height / 2 * heightMultiplier)
      width: Math.floor(width / 2)
      height: Math.floor(height / 2)
    })

  {path, rgb}


createCss = ({path, rgb}) ->
  colors = _.reduce rgb, (result, {r, g, b}) ->
    result.concat "rgb(#{r}, #{g}, #{b})"
  , []

  css = """
    background-image:
      -webkit-radial-gradient(0% 0%, circle, #{colors[0]}, transparent),
      -webkit-radial-gradient(100% 0%, circle, #{colors[1]}, transparent),
      -webkit-radial-gradient(0% 100%, circle, #{colors[2]}, transparent),
      -webkit-radial-gradient(100% 100%, circle, #{colors[3]}, transparent);
  """

  {path, rgb, css}


sample = (path) ->
  getImageInstance(path)
    .then(getAveragePalette)
    .then(createCss)


module.exports = {sample}