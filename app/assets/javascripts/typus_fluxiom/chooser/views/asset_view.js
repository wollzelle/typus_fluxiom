Fluxiom.Views.Asset = Backbone.View.extend({
  
  template: JST['chooser/templates/asset'],

  events: {
    'click .flux-asset' : 'select'
  },
    
  initialize: function(options){
    this.options = options;
    this.model.bind('change:selected', _.bind(this.renderSelected, this));
    this.render();    
  },

  render: function(){
    var data = {
      img_url     : this.options.baseUrl + this.model.get('url_to_medium_thumbnail'),
      public_url  : this.model.get('public_url'),
      description : this.model.escape('description'),
      has_caption : this.model.escape('description').length ? 'has-caption' : ''
    };

    $(this.el).html(this.template(data));
  },
  
  select: function(e){        
    if (this.model.get('selected') == true)
      this.model.set({ selected: false });      
    else
      this.model.set({ selected: true });
  },
  
  renderSelected: function(e){
    $(this.el).find('.flux-asset').toggleClass('selected');
  }

});