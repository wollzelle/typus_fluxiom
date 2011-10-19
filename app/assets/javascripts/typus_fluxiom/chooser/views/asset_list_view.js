Fluxiom.Views.AssetList = Backbone.View.extend({
  
  el: $('#flux-assets ol'),
  
  loader: $('#flux-loader'),
    
  initialize: function(options){
    this.baseUrl = options.baseUrl;
    this.collection.bind('reset', _.bind(this.reset, this));
    this.collection.bind('add', _.bind(this.add, this));
    $(window).bind('scroll', _.throttle(_.bind(this.infiniteScroll, this), 500));
  },
  
  add: function(asset){
    $(this.el).append(new Fluxiom.Views.Asset({ model: asset, baseUrl: this.baseUrl }).el);
  },
  
  infiniteScroll: function(e){    
    var loader = $('#flux-loader:in-viewport');
    var loaderInViewport = loader.length > 0;

    if (!this.collection.lastPage && loaderInViewport) {
      this.loader.addClass('active');
      this.collection.fetchAssets();
    } else {
      this.loader.removeClass('active');
    }
  },
  
  reset: function(){
    this.el.empty();
    this.loader.removeClass('active');    
  }
  
});