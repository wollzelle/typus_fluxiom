class Fluxiom.Collections.Gallery extends Backbone.Collection

  model: Fluxiom.Models.GalleryItem
  
  initialize: (models, options) ->
    { @baseName, @format, @translations } = options