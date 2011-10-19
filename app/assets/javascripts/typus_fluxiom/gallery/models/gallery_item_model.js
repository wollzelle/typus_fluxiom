Fluxiom.Models.GalleryItem = Backbone.Model.extend({

  baseName: function(){
    return this.collection.baseName + '[' + this.cid + ']';
  },
  
  thumbnail: function(){
    return this.get('public_url').replace(/_.*/, '_' + this.collection.format);
  }
  
});