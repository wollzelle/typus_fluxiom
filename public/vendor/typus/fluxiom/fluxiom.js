/*! ----------------------------------------------------------------------------
* fluxiom.js
* Copyright 2011 wollzelle GmbH (http://wollzelle.com). All rights reserved.
* --------------------------------------------------------------------------- */

var Flux = {

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
    this.assets.bind('loaded', _.bind(this.getTags, this));
    this.selectedAssets = new Flux.Models.SelectedAssets();
    this.chooser = new Flux.Views.Chooser();
  },

  // this is needed for authorization in Firefox
  getTags: function(){
    this.tags = new Flux.Models.Tags();
  }

};

$(document).ready(function(){ 
  Flux.initialize();
});