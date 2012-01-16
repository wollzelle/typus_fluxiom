class Fluxiom.Models.Asset extends Backbone.Model
  
  defaults:
    selected: false
  
  initialize: (attr) ->
    @set({ caption: (attr.description or attr.title) })
    