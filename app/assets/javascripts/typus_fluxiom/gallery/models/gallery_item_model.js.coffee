class Fluxiom.Models.GalleryItem extends Backbone.Model
  defaults:
    caption: []

  baseName: ->
    @collection.baseName + '[' + @cid + ']'
  
  thumbnail: ->
    @get('public_url').replace(/_.*/, '_' + @collection.format)