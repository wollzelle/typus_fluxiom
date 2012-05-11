class Fluxiom.Models.Asset extends Backbone.Model

  defaults:
    selected: false

  initialize: (attr) ->
    @set({ caption: (attr.description or attr.title) })

  thumb: () ->
    @get('thumb_url').replace(/64.jpg$/, '256.jpg')
