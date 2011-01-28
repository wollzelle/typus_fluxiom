/*! ----------------------------------------------------------------------------
* _flux_gallery_javascripts.js.erb
* Copyright 2010 wollzelle GmbH (http://wollzelle.com). All rights reserved.
* --------------------------------------------------------------------------- */

$(function() { 

  /* make gallery sortable
  ------------------------------------- */

  $(".flux-gallery").sortable({ 
    items  : '.flux-image',
    cursor : 'move',
    helper : 'clone',
    revert : 50
  }); 
       
  /* open popup
  ------------------------------------- */
  
  var fancyboxOptions = {        
    'titleShow'      : false,        
    'type'           : 'iframe',
    'width'          : '80%',
    'height'         : '80%',
    'padding'        : 0,
    'margin'         : 0,
    'overlayOpacity' : .3,
    'transitionIn'   : 'none',
    'transitionOut'  : 'none'    
  }
  
  $('.flux-add-button').fancybox(fancyboxOptions);        

  /* remove item
  ------------------------------------- */
    
  $('.flux-remove-button').live('click', function(e){        
    e.preventDefault();          
    var el = $(this);        

    el.parent().remove();        

    // if no more assets available
    if ($(".flux-gallery .flux-image").length == 0) { 
      var name  = '<%= "#{obj}[#{attribute}]" %>'; 
      var input = '<input id="flux-gallery-empty" type="hidden" name="' + name + '" value="">';
      $(".flux-gallery .flux-item").before(input);
    }
  });   
   
  /* edit captions 
  ------------------------------------- */ 
  
  $('.flux-caption').live('keyup', function(e) {
    if (e.keyCode == 13 || e.keyCode == 27) this.blur();
  });
     
  /* update gallery with new images
  ------------------------------------- */  
  
  $(document).bind('flux:updateGallery', function(event, images){
  
    $(images).each(function(idx, item) {
        
      var img_src  = item.public_url.replace(/_.*/,'_f<%= geometry %>.jpg');
      var obj      = '<%= "#{obj}[#{attribute}][]" %>';
      var template = $('.flux-image-template').clone();
      
      template.removeClass('flux-image-template').addClass('flux-image');
      template.children('img').attr('src', img_src).attr('alt', item.description);
      template.children('.flux-caption').attr('name', obj + '[description]').val(item.description);
      template.children('.flux-public-url').attr('name', obj + '[public_url]').val(item.public_url);
      
      template.insertBefore('.flux-item-add');   
      
      $.fancybox.close();                                 
    });

  });

});