Fluxiom.Models.Tag = Backbone.Model.extend({
  
  defaults: {
    selected: false
  },
  
  initialize: function(){
    this.collection.bind('reset', _.bind(this.handleReset, this));
  },

  handleReset: function(){
    this.set({ selected: false });
  }
  
});