Fluxiom.Views.Tag = Backbone.View.extend({
  
  template: JST['typus_fluxiom/chooser/templates/tag'],

  events: {
    'click .flux-tag' : 'select'
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
    $(this.el).html(this.template(data));
  },
  
  select: function(e){        
    if (this.model.get('selected') == true)
      this.model.set({ selected: false });      
    else
      this.model.set({ selected: true });

    e.preventDefault();
  }

});