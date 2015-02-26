class Fluxiom.Models.GalleryItem extends Backbone.Model
  defaults:
    caption: []

  baseName: ->
    @collection.baseName + '[]'

  thumbnail: ->
    @get('public_url').replace(/_.*/, '_' + @collection.format)