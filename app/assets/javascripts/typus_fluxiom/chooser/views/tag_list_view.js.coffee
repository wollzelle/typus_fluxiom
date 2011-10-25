class Fluxiom.Views.TagList extends Backbone.View

  el: $('#flux-tags')
  
  initialize: ->
    @el = $(@el)
    @collection.bind('reset', @addAll)
  
  addOne: (model) =>
    @el.append(new Fluxiom.Views.Tag({ model }).el)
  
  addAll: =>
    @collection.each(@addOne)
