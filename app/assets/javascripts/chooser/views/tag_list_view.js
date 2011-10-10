Fluxiom.Views.TagList = Backbone.View.extend({

  el: $('#flux-tags'),
  
  initialize: function(){
    this.collection.bind('reset', _.bind(this.addAll, this));
  },
  
  addOne: function(asset) {
    $(this.el).append(new Fluxiom.Views.Tag({ model: asset }).el);
  },
  
  addAll: function(asset){
    this.collection.each(_.bind(this.addOne, this));
  }

});