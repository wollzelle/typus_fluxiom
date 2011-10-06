/* 
*= require underscore
*= require backbone
*= require jquery.ui
*= require_self
*= require_tree ./gallery/models
*= require_tree ./gallery/collections
*= require_tree ./gallery/templates
*= require_tree ./gallery/views
*/

window.Fluxiom = {};

Fluxiom.Gallery = function(options, element){
  this.options = options;
  this.element = element;
  this._init();
};

Fluxiom.Gallery.prototype = {

  _init: function(){
    
    if (this.options.data.length) {
      console.log('creating...');
      var collection = new GalleryCollection(this.options);
      new GalleryListView({ collection: collection });      
    }

    // $('#csclf_students_photos').bind('flux:gallery:update', function(event, images){
    //   console.log(event);
    //   console.log(images);
    // });
  }

};

$.widget.bridge("fluxiomGallery", Fluxiom.Gallery);