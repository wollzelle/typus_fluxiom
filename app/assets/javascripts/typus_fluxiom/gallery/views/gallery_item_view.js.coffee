class Fluxiom.Views.GalleryItem extends Backbone.View

  tagName: 'li'

  className: 'flux-item flux-image'

  template: JST['typus_fluxiom/gallery/templates/image']

  events:
    'click .flux-remove-button': 'removeItem'
    'keyup .flux-caption': 'escapeEdit'

  initialize: ->
    @el = $(@el)
    @collection = @model.collection
    @render()

  render: ->
    @el.html(@template({
      base_name     : @model.baseName()
      thumbnail     : @model.thumbnail()
      public_url    : @model.get('public_url')
      caption       : @model.get('caption')
      translations  : @collection.translations
      classes       : 'has-caption' if @model.escape('caption').length
    }))

  removeItem: (e) ->
    e.preventDefault()
    @collection.remove(@model)
    @remove()

  escapeEdit: (e) ->
    if e.keyCode is 27 then e.target.blur()