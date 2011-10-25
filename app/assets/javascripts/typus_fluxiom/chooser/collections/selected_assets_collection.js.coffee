class Fluxiom.Collections.SelectedAssets extends Backbone.Collection
  
  model: Fluxiom.Models.Asset
  
  toggleSelected: (model, selected) ->
    if selected then @add(model) else @remove(model)
  
  add: (asset) ->
    return if @any((model) -> model.get('id') is asset.get('id'))
    super(asset)
