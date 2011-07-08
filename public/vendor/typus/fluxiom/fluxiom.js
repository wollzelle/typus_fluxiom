/*! ----------------------------------------------------------------------------
* fluxiom.js
* Copyright 2011 wollzelle GmbH (http://wollzelle.com). All rights reserved.
* --------------------------------------------------------------------------- */

var Fluxiom = {
  // Set modes based on browser features
  
  initialize: function(){        
    
    
    this.assetsContainer = $('#flux-assets ol');
    this.tagsContainer = $('#flux-tags');
    this.assets = new Fluxiom.Assets();
    this.fetchAssets(false);
    this.tags = new Fluxiom.Tags();
    this.tags.fetch({dataType:'jsonp'});
    
    
  },
  
  fetchAssets: function(add, tag, page){
    page = (page || 1);
    var data = {page:page};

    if(tag)
      data.tags = tag;
    
    if (!add)
      this.assetsContainer.empty();
    this.assets.fetch({add: add, processData:true, dataType:'jsonp' , data:data});    
  },
    
  // onFilesAdded: function(asset){
  //   if(typeof console != 'undefined'){console.log("onTagAdded")};
  //   var row = new Fluxiom.Views.Thumbnail({ model: asset });
  //   this.assetsContainer.append(row.el);
  //       
  // },
  // 
  // onTagsAdded: function(tag){
  //   var row = new Fluxiom.Views.Tag({ model: tag });
  //   this.tagsContainer.append(row.el);
  // }
};

// Models
// ----------
Fluxiom.Asset = Backbone.Model.extend({ 
  initialize: function(){
    if(typeof console != 'undefined'){console.log(           )};       
    var row = new Fluxiom.Views.Thumbnail({ model: this });
    Fluxiom.assetsContainer.append(row.el);
  }

});

Fluxiom.Tag = Backbone.Model.extend({ 
  initialize: function(){   
    var row = new Fluxiom.Views.Tag({ model: this });
    Fluxiom.tagsContainer.append(row.el);

  }

});


// Collection
// ----------

Fluxiom.Assets = Backbone.Collection.extend({ 
  model: Fluxiom.Asset,
  url: 'http://tho.flux.local:2000/api/assets.json',
  
  parse : function(resp, xhr) {
    return _.reject(resp, function(o){ return o.public_url == null; });
  }
});

Fluxiom.Tags = Backbone.Collection.extend({ 
  model: Fluxiom.Tag,
  url: 'http://tho.flux.local:2000/api/tags.json',
  
  parse : function(resp, xhr) {
    return resp;
  }
});


// Views
// -----

Fluxiom.Views = {};

Fluxiom.Views.Thumbnail = Backbone.View.extend({
  tagName: 'li',
  className: 'flux-asset',
  
  initialize: function() {
  this.render();  
  },
  
  render: function() {

    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  },
  
  template: function(a){
    var compiled= _.template('<img src="http://tho.flux.local:2000/<%= url_to_medium_thumbnail %>" data-public-url="<%= public_url %>" data-description="<%= description %>"><span class="caption"><%= description %></span>');
    return compiled(a);
  }
});

Fluxiom.Views.Tag = Backbone.View.extend({
  events: {
    'click': 'onClick'
  },
  
  tagName: 'wrapper',
  initialize: function() {
    this.render();  
  },
  
  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  },
  
  template: function(tag){
    var compiled= _.template('<label class="flux-tag" for="radio-<%= tag %>" data-tag-filter="tag_<%= id %>"><input type="radio" id="radio-<%= tag %>" name="radio" value="tag_<%= id %>"><%= tag %></label>');
    return compiled(tag);
  },
  
  onClick: function(e){
   Fluxiom.fetchAssets(false, this.model.get('id'));
   e.preventDefault();
  }
});

// Initialize
//-----------

$(document).ready(function(){ 
  
  Fluxiom.initialize(); 

});
