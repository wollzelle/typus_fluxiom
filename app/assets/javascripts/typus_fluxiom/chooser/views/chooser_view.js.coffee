class Fluxiom.Views.Chooser extends Backbone.View
  
  el: '#flux-asset-chooser'
  
  events:
    'click #flux-clear-button' : 'clearSelection'
    'click #flux-use-button'   : 'useAssets'
    
  initialize: ->
    @collection.bind('all', @updateSelectedCount)    

  updateSelectedCount: =>
    button     = $('#flux-use-button')
    buttonText = button.data('default-text')
    count      = @collection.length
    if count > 0
      button.val("#{buttonText} (#{count})").addClass('active')
    else
      button.val(buttonText).removeClass('active')
  
  clearSelection: (e) ->
    @collection.reset()
    e.preventDefault()
  
  useAssets: (e) ->
    galleryId = _.getQueryString()['gallery_id']
    gallery = parent.$(parent.document).find('#' + galleryId)
    gallery.trigger('fluxiom:gallery:update', [@collection])
    e.preventDefault()
