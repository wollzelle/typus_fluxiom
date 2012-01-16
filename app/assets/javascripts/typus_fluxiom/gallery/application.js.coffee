#! ----------------------------------------------------------------------------
# typus_fluxiom
# Copyright 2011 wollzelle GmbH (http://wollzelle.com). All rights reserved.
# -----------------------------------------------------------------------------

#= require underscore
#= require backbone
#= require jquery-ui

#= require_self
#= require_tree ./models
#= require_tree ./collections
#= require_tree ./templates
#= require_tree ./views

window.Fluxiom =
  Models: {}
  Collections: {}
  Views: {}

Fluxiom.Gallery = (options, element) ->
  @el = element
  @collection = new Fluxiom.Collections.Gallery(options.data, options)
  @view = new Fluxiom.Views.Gallery({ @el, @collection })
  @initialize()

Fluxiom.Gallery.prototype =

  initialize: ->
    $(@el).bind('fluxiom:gallery:update', _.bind(@updateGallery, this))

  updateGallery: (event, assets) ->
    assets.forEach((asset) =>
      @collection.add({
        public_url  : asset.get('public_url')
        caption     : asset.get('caption')
      })
    )
    $.fancybox.close()

# extend jquery
$.widget.bridge('fluxiomGallery', Fluxiom.Gallery)