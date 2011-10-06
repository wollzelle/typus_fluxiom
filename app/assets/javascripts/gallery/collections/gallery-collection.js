var GalleryCollection = Backbone.Collection.extend({

  model: GalleryItem,
  
  initialize: function(options){
    this.baseName = options.baseName;
    this.format = options.format;
    this.reset(options.data);
  }
  
});