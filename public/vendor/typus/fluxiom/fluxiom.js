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
    this.tags = new Flux.Models.Tags();
    this.assets = new Flux.Models.Assets();
    this.selectedAssets = new Flux.Models.SelectedAssets();
    this.chooser = new Flux.Views.Chooser();
  }

};

$(document).ready(function(){ 
  Flux.initialize();
});