class Fluxiom.Views.AssetList extends Backbone.View
  
  el: $('#flux-assets ol')
  
  loader: $('#flux-loader')
    
  initialize: (options) ->  
    @el = @$el
    @baseUrl = options.baseUrl
    @collection.bind('reset', @reset)
    @collection.bind('add', @add)
    $(window).bind('scroll', _.throttle(@infiniteScroll, 500))
  
  add: (model) =>
    @el.append(new Fluxiom.Views.Asset({ model, @baseUrl }).el)

  reset: =>
    @el.empty()
    @loader.removeClass('active')
  
  infiniteScroll: (e) =>
    loader = $('#flux-loader:in-viewport')
    loaderInViewport = loader.length > 0
    if (!@collection.lastPage && loaderInViewport)
      @loader.addClass('active')
      @collection.fetchAssets()
    else
      @loader.removeClass('active')
