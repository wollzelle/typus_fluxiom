/*! ----------------------------------------------------------------------------
* asset.js
* Copyright 2011 wollzelle GmbH (http://wollzelle.com). All rights reserved.
* --------------------------------------------------------------------------- */

// Models
// ------

Flux.Models.Asset = Backbone.Model.extend({ 

  initialize: function(){
    var asset = new Flux.Views.Asset({ model: this });    
    var id = this.get('id');
    var selected = Flux.selectedAssets.pluck('id');
    var present = _.include(selected, id);

    Flux.assetsContainer.append(asset.el);

    if (present) asset.select();
    // if (present) this.set({ 'selected':true });
  }

});

Flux.Models.Assets = Backbone.Collection.extend({ 

  model: Flux.Models.Asset,

  url: Flux.Config.url + '/api/assets.json',  

  initialize: function(){
    this.fetchAssets();
  },
  
  parse: function(res, xhr) {
    return _.reject(res, function(asset){ return asset.public_url == ""; });
  },
  
  fetchAssets: function(options){
    var defaults = {
      add:  null,
      tag:  null,
      page: 1
    };
    
    var opt = _.extend(defaults, options);
        
    var data = { 
      tags: opt.tag, 
      page: opt.page 
    };
          
    if (!opt.add) Flux.assetsContainer.empty();
    
    // this.fetch({ add: _add, processData: true, dataType: 'jsonp', data: data });
    this.fetch({ dataType: 'jsonp', add: opt.add, data: data });
  }
  
});

Flux.Models.SelectedAssets = Backbone.Collection.extend({
  
  model: Flux.Models.Asset
  
});

// Views
// -----

Flux.Views.Asset = Backbone.View.extend({
  
  events: {
    'click .flux-asset' : 'select'
  },
    
  initialize: function() {
    // this.model.bind('change:selected', _.bind(this.select, this));
    this.render();
  },

  render: function() {
    var data = {
      img_url     : Flux.Config.url + this.model.get('url_to_medium_thumbnail'),
      public_url  : this.model.get('public_url'),
      description : this.model.escape('description'),
      classes     : this.model.escape('description').length ? 'has-caption' : '' 
    };

    var template = _.template( $("#flux-asset-template").html(), data);
    $(this.el).html(template);
  },
  
  select: function(e){    
    var id = this.model.get('id');
    var selected = Flux.selectedAssets.pluck('id');
    var present = _.include(selected, id);

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