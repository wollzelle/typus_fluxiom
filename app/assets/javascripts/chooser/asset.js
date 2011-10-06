/*! ----------------------------------------------------------------------------
* asset.js
* Copyright 2011 wollzelle GmbH (http://wollzelle.com). All rights reserved.
* --------------------------------------------------------------------------- */

// Models
// ------

Flux.Models.Asset = Backbone.Model.extend();

Flux.Models.Assets = Backbone.Collection.extend({ 

  model: Flux.Models.Asset,

  url: Flux.Config.apiUrl + '/assets.json',
    
  page: 1,

  tag: null,

  initialize: function(){
    this.bind('reset', _.bind(this.handleReset, this));
    Flux.assetList = new Flux.Views.AssetList({ collection: this });
    this.fetchAssets();
  },
  
  parse: function(res, xhr) {
    this.lastPage = (res.length  < Flux.Config.perPage) ? true : false;
    return _.reject(res, function(asset){ return asset.public_url == null; });
  },
  
  fetchTag: function(tag){
    this.reset();
    this.tag = tag;
    this.fetchAssets();
  },
  
  fetchAssets: function(){
    var page = this.page++; // page = 1, this.page = 2
    var data = { page: page, per_page: Flux.Config.perPage/*, tags: 'videos'*/ };

    // if (this.tag) data.tags += ',' + this.tag;
    if (this.tag) data.tags = this.tag;    
      
    this.fetch({ 
      dataType: Flux.Config.dataType, 
      add: 'add', 
      data: data,
      success: _.bind(this.handleSuccess, this)
    });
  },
  
  handleSuccess: function(collection, response){
    this.trigger("loaded", collection);
  },
  
  handleReset:function(){
    this.page = 1;
    this.tag = null;
  }
  
});

Flux.Models.SelectedAssets = Backbone.Collection.extend({
  
  model: Flux.Models.Asset
  
});

// Views
// -----

Flux.Views.AssetList = Backbone.View.extend({
  
  el: $('#flux-assets ol'),
  
  loader: $('#flux-loader'),
    
  initialize: function(){
    this.collection.bind('reset', _.bind(this.handleReset, this));
    this.collection.bind('add', _.bind(this.add, this));
    $(window).bind('scroll', _.throttle(_.bind(this.infiniteScroll, this), 500));
  },
  
  add: function(asset){
    $(this.el).append(new Flux.Views.Asset({ model:asset }).el);
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
  
  handleReset: function(){
    this.el.empty();
    this.loader.removeClass('active');    
  }
  
});

Flux.Views.Asset = Backbone.View.extend({
  
  events: {
    'click .flux-asset' : 'select'
  },
    
  initialize: function() {
    this.render();
    var id = this.model.get('id');
    var present = Flux.selectedAssets.get(id);
    if (present) this.select();
  },

  render: function() {
    var data = {
      img_url     : Flux.Config.baseUrl + this.model.get('url_to_medium_thumbnail'),
      public_url  : this.model.get('public_url'),
      description : this.model.escape('description'),
      classes     : this.model.escape('description').length ? 'has-caption' : '' 
    };

    var template = _.template( $("#flux-asset-template").html(), data);
    $(this.el).html(template);
  },
  
  select: function(e){    
    var id = this.model.get('id');
    var present = Flux.selectedAssets.get(id);

    if (this.model.get('selected')) {
      $(this.el).find('.flux-asset').removeClass('selected');
      this.model.unset('selected');      
      Flux.selectedAssets.remove(this.model);
    }
    else {
      $(this.el).find('.flux-asset').addClass('selected');
      this.model.set({ selected: true });
      if (!present) Flux.selectedAssets.add(this.model);
    }
  }

});