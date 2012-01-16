class Fluxiom.Views.Asset extends Backbone.View
  
  template: JST['typus_fluxiom/chooser/templates/asset']

  events:
    'click .flux-asset' : 'select'
    
  initialize: (options) ->
    @el = $(@el)
    @options = options
    @model.bind('change:selected', @renderSelected)
    @render()

  render: ->   
    @el.html(@template({
      img_url     : @options.baseUrl + @model.get('url_to_medium_thumbnail')
      public_url  : @model.get('public_url')
      caption     : @model.escape('caption')
      has_caption : 'has-caption' if @model.escape('caption').length
    }))
  
  select: (e) ->
    if (@model.get('selected') is true)
      @model.set({ selected: false })      
    else
      @model.set({ selected: true })
  
  renderSelected: (e) =>
    @el.find('.flux-asset').toggleClass('selected')
