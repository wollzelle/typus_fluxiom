class Fluxiom.Models.Tag extends Backbone.Model

  defaults:
    selected: false

  initialize: ->
    @collection.bind('reset', @handleReset)

  handleReset: =>
    @set({ selected: false })

  select: =>
    @collection.each (model) =>
      if model is this
        model.set({ selected: true })
      else
        # Clearing selected state on other tags shouldn't filter assets
        model.set({ selected: false }, { quiet: true })

  deselect: =>
    @set({ selected: false })
