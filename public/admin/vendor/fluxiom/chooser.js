/*! ----------------------------------------------------------------------------
* chooser.js
* Copyright 2010 wollzelle GmbH (http://wollzelle.com). All rights reserved.
* --------------------------------------------------------------------------- */

$(function() {

  /* tag filter
  ------------------------------------- */

  $('#flux-tags input').click(function(e){      
    var el    = $(e.target),
        label = el.parent('label'),
        tag   = el.attr('value');

    if (el.hasClass('filter-tag')) return;

    if (label.hasClass('active')) {
      $('#flux-tags label').removeClass('active');
      $('#flux-assets li').show();
    }
    else {
      $('#flux-tags label').removeClass('active');      
      label.addClass('active');            
      $('#flux-assets li').hide();
      $('#flux-assets li.' + tag).show();      
    }
  });

  /* make images selectable
  ------------------------------------- */  

  // $('#flux-assets ol').selectable({
  //   filter: '.flux-asset:visible',
  //   stop:   updateSelectedCount
  // });
  
  $('.flux-asset').click(function(e){
    $(this).toggleClass('ui-selected');
    updateSelectedCount();
  });

  $('#flux-clear-button').click(function(e){      
    e.preventDefault();      
    var button = $('#flux-use-button');
    $('.flux-asset').removeClass('ui-selected');
    updateSelectedCount();
  });

  function updateSelectedCount() {
    var 
      button     = $('#flux-use-button'),
      buttonText = button.data('default-text'),
      count      = $('#flux-assets .ui-selected').size();

    if (count > 0)
      button.val(buttonText + ' (' + count + ')').addClass('active');
    else
      button.val(buttonText).removeClass('active');
  }

  /* return selected images to gallery
  ------------------------------------- */

  $('#flux-form').submit(function(e){

    e.preventDefault();

    var data = [];
    var selected = $('#flux-assets .ui-selected img');

    selected.each(function(idx, item){

      var item = $(item);
      var img = {};

      img.public_url = item.attr('data-public-url');
      img.description = item.attr('data-description');        

      data.push(img);        
    });        

    parent.$(parent.document).trigger('flux:updateGallery', [data]);

  });            

});