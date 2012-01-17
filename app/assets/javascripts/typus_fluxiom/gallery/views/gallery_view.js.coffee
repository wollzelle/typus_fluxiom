class Fluxiom.Views.Gallery extends Backbone.View

  initialize: (options) ->
    @el = $(@el);
    @collection = options.collection
    @gallery = @el.find('.flux-gallery')
    @addButton = @el.find('.flux-item-add')
    @collection.bind('add', @addOne)
    @collection.bind('remove', @onRemove)
    @collection.bind('reset', @onReset)
    @makeSortable()
    @setupPopup()
    @onReset()

  onReset: =>
    @collection.each(@addOne, false)
    @triggerRefresh()

  addOne: (model, refresh=true) =>
    item = new Fluxiom.Views.GalleryItem({ model }).el
    @el.find('.flux-empty').remove()
    @addButton.before(item)
    @triggerRefresh() if refresh

  onRemove: =>
    template = JST['typus_fluxiom/gallery/templates/empty']
    if @collection.length is 0
      $(@gallery).append(template({ base_name: @collection.baseName }))

  triggerRefresh: ->
    $(window).trigger('translate:refresh')

  makeSortable: ->
    @el.sortable({
      items  : '.flux-image'
      cursor : 'move'
      helper : 'clone'
      revert : 50
    })

  setupPopup: ->
    @el.find('.flux-add-button').fancybox({
      titleShow        : false
      type             : 'iframe'
      width            : '80%'
      height           : '80%'
      padding          : 0
      margin           : 0
      overlayOpacity   : 0.3
      transitionIn     : 'none'
      transitionOut    : 'none'
      onStart          : @toggleScroll
      onClosed         : @toggleScroll
    })

  toggleScroll: ->
    $('body').toggleClass('fancybox-overlay')
    return null
