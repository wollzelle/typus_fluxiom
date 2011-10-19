Fluxiom.Collections.Tags = Backbone.Collection.extend({ 

  model: Fluxiom.Models.Tag,
  
  url: function(){
    return this.options.apiUrl + '/tags.json';
  },
  
  initialize: function(models, options){
    this.options = options;
    this.fetch({ dataType: this.options.dataType });
    this.view = new Fluxiom.Views.TagList({ collection: this });    
  },
  
  parse: function(res, xhr) {
    return _.reject(res, function(tag){ return tag.documents_count == 0; });
  }

});