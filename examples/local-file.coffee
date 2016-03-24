colors = require('../index')

colors.sample('examples/img/thumbnail/2vw5lrp.jpg')
  .then (result) ->
    console.log "result", result
  .fail (error) ->
    console.log "error", error