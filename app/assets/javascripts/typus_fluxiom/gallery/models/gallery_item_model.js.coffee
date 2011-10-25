class Fluxiom.Models.GalleryItem extends Backbone.Model

  baseName: ->
    @collection.baseName + '[' + @cid + ']'
  
  thumbnail: ->
    @get('public_url').replace(/_.*/, '_' + @collection.format)