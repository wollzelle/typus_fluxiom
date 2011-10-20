//= require underscore
//= require backbone
//= require jquery-ui

//= require_self
//= require_tree ./models
//= require_tree ./collections
//= require_tree ./templates
//= require_tree ./views

window.Fluxiom = {
  Models: {},
  Collections: {},
  Views: {}  
};

Fluxiom.Gallery = function(options, element){
  this.element = element;
  this.collection = new Fluxiom.Collections.Gallery(options.data, options);
  this.view = new Fluxiom.Views.Gallery({ el: this.element, collection: this.collection });
  this.initialize();
};

Fluxiom.Gallery.prototype = {

  initialize: function(){    
    $(this.element).bind('fluxiom:gallery:update', _.bind(this.updateGallery, this));    
  },
  
  updateGallery: function(event, assets){
    var collection = this.collection;

    assets.forEach(function(asset){
      var data = {
        public_url  : asset.get('public_url'),
        description : asset.get('description')
      };
      collection.add(data);
    });

    $.fancybox.close();

    //   if (translate)
    //     $(window).trigger('translate:refresh');
  }

};

$.widget.bridge("fluxiomGallery", Fluxiom.Gallery);