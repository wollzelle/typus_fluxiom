Fluxiom.Views.Gallery = Backbone.View.extend({
    
  initialize: function(options){
    this.collection = options.collection;
    this.gallery = this.$('.flux-gallery');
    this.addButton = this.$('.flux-item-add');
    this.collection.bind('add',   _.bind(this.addOne, this));
    this.collection.bind('remove',_.bind(this.onRemove, this));    
    this.collection.bind('reset', _.bind(this.addAll, this));    
    this.makeSortable();
    this.setupPopup();
    this.addAll();
  },

  addOne: function(model){
    var item = new Fluxiom.Views.GalleryItem({ model: model }).el;
    this.$('.flux-empty').remove();
    this.addButton.before(item);
  },
  
  addAll: function(){
    this.collection.each(_.bind(this.addOne, this));
  },
  
  onRemove: function(model){
    if (this.collection.length == 0) {
      var template = JST['gallery/templates/empty'];
      $(this.gallery).append(template({ base_name: this.collection.baseName }));
    }
  },
  
  makeSortable: function(){
    $(this.el).sortable({ 
      items  : '.flux-image',
      cursor : 'move',
      helper : 'clone',
      revert : 50
    });
  },
  
  setupPopup: function(){
    var options = {        
      'titleShow'      : false,        
      'type'           : 'iframe',
      'width'          : '80%',
      'height'         : '80%',
      'padding'        : 0,
      'margin'         : 0,
      'overlayOpacity' : 0.3,
      'transitionIn'   : 'none',
      'transitionOut'  : 'none',
      'onStart'        : function(){
        $('body').addClass('fancybox-overlay');
      },
      'onClosed'       : function(){
        $('body').removeClass('fancybox-overlay');
      }
    };

    $('.flux-add-button').fancybox(options);
  }
  
});
