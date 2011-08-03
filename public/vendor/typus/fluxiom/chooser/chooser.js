/*! ----------------------------------------------------------------------------
* chooser.js
* Copyright 2011 wollzelle GmbH (http://wollzelle.com). All rights reserved.
* --------------------------------------------------------------------------- */

Flux.Views.Chooser = Backbone.View.extend({
  
  el: '#flux-asset-chooser',
  
  events: {
    'click #flux-clear-button' : 'clearSelection',
    'click #flux-use-button'   : 'useAssets'
  },
    
  initialize: function(){
    Flux.selectedAssets.bind('all', _.bind(this.updateSelectedCount, this));    
  },

  updateSelectedCount: function(){
    var button     = $('#flux-use-button');
    var buttonText = button.data('default-text');
    var count      = Flux.selectedAssets.length;
    
    if (count > 0)
      button.val(buttonText + ' (' + count + ')').addClass('active');
    else
      button.val(buttonText).removeClass('active');
  },
  
  clearSelection: function(e){
    $('.flux-asset').removeClass('selected');
    Flux.selectedAssets.reset();
    e.preventDefault();    
  },
  
  useAssets: function(e){
    var data = Flux.selectedAssets.models;
    parent.$(parent.document).trigger('flux:gallery:update', [data]);
    e.preventDefault();    
  }
  
});