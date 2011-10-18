/* 
*= require jquery
*= require jquery-ui
*= require underscore
*= require backbone
*= require jquery.viewport
*= require_self
*= require_tree ./lib
*= require_tree ./chooser/models
*= require_tree ./chooser/collections
*= require_tree ./chooser/templates
*= require_tree ./chooser/views
*/

window.Fluxiom = {
  Models: {},
  Collections: {},
  Views: {}
};

Fluxiom.Chooser = function(options, element){
  this.element = element;
  this.options = options;
  this.options.dataType = options.useProxy ? 'json' : 'jsonp';
  this.initialize();
};

Fluxiom.Chooser.prototype = {

  initialize: function(){
    var assets = this.assets = new Fluxiom.Collections.Assets(null, this.options);
    var selectedAssets = new Fluxiom.Collections.SelectedAssets();
    var chooser = new Fluxiom.Views.Chooser({ collection: selectedAssets });
    this.getTags = _.bind(this.getTags, this);
    
    // get tags when assets are ready
    assets.bind('loaded', this.getTags);
    
    // add assets > selected assets
    assets.bind('change:selected', _.bind(selectedAssets.toggleSelected, selectedAssets));

    // add selected assets > assets
    assets.bind('loaded', _.bind(assets.preSelect, assets, selectedAssets));

    // clear selected assets
    selectedAssets.bind('reset', _.bind(assets.clearSelected, assets));
  },
  
  // this is needed for authorization in Firefox
  getTags: function(){
    var assets = this.assets;
    var tags   = new Fluxiom.Collections.Tags(null, this.options);

    assets.unbind('loaded', this.getTags);
    tags.bind('change:selected', _.bind(assets.filter, assets));
  }

};

$.widget.bridge("fluxiomChooser", Fluxiom.Chooser);
