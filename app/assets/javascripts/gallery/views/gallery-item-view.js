var GalleryItemView = Backbone.View.extend({
  
  template: JST['gallery/templates/image'],
  
  events: {
    'click .flux-remove-button': 'removeItem',
    'keyup .flux-caption': 'escapeEdit'
  },
  
  initialize: function(){
    this.collection = this.model.collection;
    this.render();
  },
  
  render: function(){
    var data = {
      base_name   : this.model.baseName(),
      thumbnail   : this.model.thumbnail(),
      public_url  : this.model.get('public_url'),
      description : this.model.get('description'),
      classes     : this.model.escape('description').length ? 'has-caption' : ''
    };    
    $(this.el).html(this.template(data));
  },
  
  removeItem: function(e){
    e.preventDefault();
    this.collection.remove(this.model);
    this.remove();
  },
  
  escapeEdit: function(e){
    if (e.keyCode == 13 || e.keyCode == 27) e.target.blur();
  }
  
});
