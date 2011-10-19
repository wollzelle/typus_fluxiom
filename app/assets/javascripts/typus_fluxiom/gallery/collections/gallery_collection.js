Fluxiom.Collections.Gallery = Backbone.Collection.extend({

  model: Fluxiom.Models.GalleryItem,
  
  initialize: function(models, options){
    this.baseName = options.baseName;
    this.format = options.format;
  }
  
});