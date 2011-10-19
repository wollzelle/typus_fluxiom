Fluxiom.Collections.Assets = Backbone.Collection.extend({ 

  model: Fluxiom.Models.Asset,

  url: function(){
    return this.options.apiUrl + '/assets.json';
  },
    
  page: 1,

  tag: null,

  initialize: function(models, options){
    this.options = options;
    this.bind('reset', _.bind(this.handleReset, this));
    this.view = new Fluxiom.Views.AssetList({ collection: this, baseUrl: this.options.baseUrl });
    this.fetchAssets();
  },
  
  parse: function(res, xhr) {
    this.lastPage = (res.length < this.options.perPage) ? true : false;
    return _.reject(res, function(asset){ return asset.public_url == null; });
  },
    
  fetchAssets: function(){
    var page = this.page++; // page = 1, this.page = 2
    var data = { page: page, per_page: this.options.perPage /*, tags: 'videos'*/ };

    // if (this.tag) data.tags += ',' + this.tag;
    if (this.tag) data.tags = this.tag;    

    this.fetch({ 
      dataType: this.options.dataType, 
      add: 'add', 
      data: data,
      success: _.bind(this.handleSuccess, this)
    });
  },
  
  clearSelected: function(){
    this.each(function(model){
      model.set({ selected: false });
    });
  },
  
  filter: function(tag, selected){
    this.reset();
    this.tag = selected ? tag.get('tag') : null;      
    this.fetchAssets();
  },
  
  handleSuccess: function(collection, response){
    this.trigger('loaded', collection);
  },
  
  handleReset:function(){
    this.page = 1;
    this.tag = null;
  },

  preSelect: function(selected){
    var self = this;
    var ids  = _.uniq(selected.pluck('id'));
    
    ids.forEach(function(id){
      var match = self.get(id);
      if (match)
        match.set({ selected: true });
    });
  }
  
});
