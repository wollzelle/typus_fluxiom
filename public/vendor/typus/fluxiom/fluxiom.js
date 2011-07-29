/*! ----------------------------------------------------------------------------
* fluxiom.js
* Copyright 2011 wollzelle GmbH (http://wollzelle.com). All rights reserved.
* --------------------------------------------------------------------------- */

/*

TODO

* Pagination on scroll / viewport

* No results message for empty tags

* Refactor selected assets 

* Refactor assetsContainer as AssetsList view

* API - json empty values should be null

* Remove wrapper divs from views?

* Backbone feature request - no div wrapper if using template (new template property?)

*/

var Flux = {  

  Views : {}, 
  Models : {},
  Config : {
    url: window.fluxiomUrl
  },
  
  initialize: function(){
    _.templateSettings = { interpolate : /\{\{(.+?)\}\}/g };
    this.assetsContainer = $('#flux-assets ol');
    this.tags = new Flux.Models.Tags();
    this.assets = new Flux.Models.Assets();
    this.selectedAssets = new Flux.Models.SelectedAssets();
    this.chooser = new Flux.Views.Chooser();
  }

};

$(document).ready(function(){ 
  Flux.initialize();
});