Fluxiom.Views.Chooser = Backbone.View.extend({
  
  el: '#flux-asset-chooser',
  
  events: {
    'click #flux-clear-button' : 'clearSelection',
    'click #flux-use-button'   : 'useAssets'
  },
    
  initialize: function(){
    this.collection.bind('all', _.bind(this.updateSelectedCount, this));    
  },

  updateSelectedCount: function(){
    var button     = $('#flux-use-button');
    var buttonText = button.data('default-text');
    var count      = this.collection.length;
    
    if (count > 0)
      button.val(buttonText + ' (' + count + ')').addClass('active');
    else
      button.val(buttonText).removeClass('active');
  },
  
  clearSelection: function(e){
    this.collection.reset();
    e.preventDefault();    
  },
  
  useAssets: function(e){
    var data      = this.collection;
    var galleryId = _.getQueryString()['gallery_id'];
    var gallery   = parent.$(parent.document).find('#' + galleryId);

    gallery.trigger('fluxiom:gallery:update', [data]);
    e.preventDefault();
  }
  
});