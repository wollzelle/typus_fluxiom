class Fluxiom.Views.TagList extends Backbone.View

  el: $('#flux-tags')

  initialize: ->
    @el = @$el
    @collection.bind('reset', @addAll)
    # Use this to upgrade to Backbone 1.0.0:  @collection.bind('sync', @addAll)

  addOne: (model) =>
    @el.append(new Fluxiom.Views.Tag({ model }).el)

  addAll: =>
    @collection.each(@addOne)
    @updateAssetsPosition()

  updateAssetsPosition: ->
    $('#flux-assets').css({
      'margin-top': $('#flux-toolbar').height()
    })
