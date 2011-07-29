/*! ----------------------------------------------------------------------------
* tag.js
* Copyright 2011 wollzelle GmbH (http://wollzelle.com). All rights reserved.
* --------------------------------------------------------------------------- */

// Models
// ------

Flux.Models.Tag = Backbone.Model.extend();

Flux.Models.Tags = Backbone.Collection.extend({ 

  model: Flux.Models.Tag,

  url: Flux.Config.url + '/api/tags.json',
  
  initialize: function(){
    this.fetch({ dataType:'jsonp' });
    Flux.tagList = new Flux.Views.TagList({ collection: this });    
  }

});

// Views
// -----

Flux.Views.TagList = Backbone.View.extend({
  
  el: $('#flux-tags'),
  
  initialize: function(){
    // this.collection.bind('add', _.bind(this.addOne, this));
    this.collection.bind('reset', _.bind(this.addAll, this));
  },
  
  addOne: function(asset) {
    $(this.el).append(new Flux.Views.Tag({ model: asset }).el);
  },
  
  addAll: function(asset){
    this.collection.each(_.bind(this.addOne, this));
  },
  
  clearSelection: function(){
    this.$('a').removeClass('active');
  }
  
});


Flux.Views.Tag = Backbone.View.extend({
    
  events: {
    'click' : 'filter'
  },
      
  initialize: function() {
    this.render();
  },
  
  render: function() {
    var data = {
      id  : this.model.get('id'),
      tag : this.model.escape('tag')
    };    
    var template = _.template( $("#flux-tag-template").html(), data);
    $(this.el).html(template);
  },
  
  filter: function(e){
    var el = $(e.target);
    var tag = el.data('tag-id');

    if (el.hasClass('active')) {      
      Flux.tagList.clearSelection();
      Flux.assets.fetchAssets();
    }
    else {
      Flux.tagList.clearSelection();
      el.addClass('active');
      Flux.assets.fetchAssets({ tag: tag });
    }
    e.preventDefault();
  }

});