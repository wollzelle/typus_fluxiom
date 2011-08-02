/*! ----------------------------------------------------------------------------
* tag.js
* Copyright 2011 wollzelle GmbH (http://wollzelle.com). All rights reserved.
* --------------------------------------------------------------------------- */

// Models
// ------

Flux.Models.Tag = Backbone.Model.extend({
  
  defaults: {
    selected: false
  },
  
  initialize: function(){
    Flux.assets.bind('reset', _.bind(this.handleReset, this));
  },

  handleReset: function(){
    this.set({ selected:false });
  }
  
});

Flux.Models.Tags = Backbone.Collection.extend({ 

  model: Flux.Models.Tag,
  
  url: Flux.Config.apiUrl + '/tags.json',
  
  initialize: function(){
    this.fetch({ dataType:Flux.Config.dataType });
    Flux.tagList = new Flux.Views.TagList({ collection: this });    
  },
  
  parse: function(res, xhr) {
    return _.reject(res, function(tag){ return tag.documents_count == 0; });
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
  }

});


Flux.Views.Tag = Backbone.View.extend({
    
  events: {
    'click .flux-tag' : 'filter'
  },
  
  paused: false,

  initialize: function() {
    this.model.bind('change', _.bind(this.render, this));
    this.render();
  },
  
  render: function(){
    var data = {
      id: this.model.get('id'),
      tag: this.model.escape('tag'),
      classes: this.model.get('selected') ? 'active' : ''
    };  
    var template = _.template( $("#flux-tag-template").html(), data);
    $(this.el).html(template);
  },
  
  filter: function(e){
    if (this.paused) return;

    var el = $(e.currentTarget);
    var tag = el.data('tag-id');

    if (!this.model.get('selected')) {
      // fetch assets for tag
      Flux.assets.bind('loaded', _.bind(this.onLoaded, this));
      Flux.assets.fetchTag(tag);
      this.paused = true;      
    } else {
      // clear filter
      Flux.assets.fetchTag();
      this.model.set({ selected: false });
      this.paused = false;
    }
    
    e.preventDefault();
  },
  
  onLoaded: function(collection){
    Flux.assets.unbind('loaded');
    this.model.set({ selected: true });
    this.paused = false;
  }
  

});