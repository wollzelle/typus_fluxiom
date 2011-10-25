class Fluxiom.Models.Tag extends Backbone.Model
  
  defaults:
    selected: false
  
  initialize: ->
    @collection.bind('reset', @handleReset)

  handleReset: =>
    @set({ selected: false })
