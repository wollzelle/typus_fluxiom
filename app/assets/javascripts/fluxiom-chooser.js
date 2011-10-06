/* 
*= require jquery
*= require underscore
*= require backbone
*= require jquery.viewport
*= require_self
*= require_tree ./lib
*= require_tree ./chooser

* require_tree ./gallery/models
* require_tree ./gallery/collections
* require_tree ./gallery/templates
* require_tree ./gallery/views
*/


window.Flux = {

  Views : {}, 
  Models : {},
  Config : {
    apiUrl: window.fluxApiUrl,
    baseUrl: window.fluxBaseUrl,
    dataType: window.fluxUseProxy ? 'json' : 'jsonp',
    perPage: 100
  },
  
  initialize: function(){
    _.templateSettings = { interpolate : /\{\{(.+?)\}\}/g };
    this.assets = new Flux.Models.Assets();
    this._getTags = _.bind(this.getTags, this);
    this.assets.bind('loaded', this._getTags);
    this.selectedAssets = new Flux.Models.SelectedAssets();
    this.chooser = new Flux.Views.Chooser();
  },

  // this is needed for authorization in Firefox
  getTags: function(){
    this.assets.unbind('loaded', this._getTags);
    this.tags = new Flux.Models.Tags();
  }

};

$(document).ready(function(){ 
  Flux.initialize();
});