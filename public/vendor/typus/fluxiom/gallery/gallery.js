/*! ----------------------------------------------------------------------------
* gallery.js
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
    'overlayOpacity' : 0.3,
    'transitionIn'   : 'none',
    'transitionOut'  : 'none',
    'onStart'        : function(){
      $('body').addClass('fancybox-overlay');
    },
    'onClosed'       : function(){
      $('body').removeClass('fancybox-overlay');
    }
  };

  var galleryIdx = $(".flux-gallery .flux-image").length;

  $('.flux-add-button').fancybox(fancyboxOptions);

  /* remove item
  ------------------------------------- */
    
  $('.flux-remove-button').live('click', function(e){        
    e.preventDefault();          
    
    $(this).parent().remove();        

    // if no more assets available // fixme: only add once
    if ($(".flux-gallery .flux-image").length == 0) { 
      var input = $('#flux-empty-template').tmpl();      
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
  
  $(document).bind('flux:gallery:update', function(event, images){
    
    var format       = fluxConfig.format,
        base_name    = fluxConfig.base_name,
        translate    = fluxConfig.translate,
        count        = $(".flux-gallery .flux-image").length;

    $(images).each(function(idx, item) {
    
      var item = item.attributes;
    
      var data = {
        img_src     : item.public_url.replace(/_.*/, '_' + format),
        public_url  : item.public_url,
        description : item.description,
        base_name   : base_name + '[' + (galleryIdx++) + ']'
      };
    
      var template = $('#flux-image-template').tmpl(data);
      
      template.insertBefore('.flux-item-add');   
      
      $('#flux-empty').remove();
    
    });

    if (translate)
      $(window).trigger('translate:refresh');

    $.fancybox.close();
  });

});