#! ----------------------------------------------------------------------------
# typus_fluxiom
# Copyright 2011 wollzelle GmbH (http://wollzelle.com). All rights reserved.
# -----------------------------------------------------------------------------

#= require jquery
#= require jquery-ui
#= require underscore
#= require backbone
#= require jquery.viewport
#= require underscore.more

#= require_self
#= require_tree ./models
#= require_tree ./collections
#= require_tree ./templates
#= require_tree ./views

window.Fluxiom =
  Models: {}
  Collections: {}
  Views: {}

Fluxiom.Chooser = (options, element) ->
  @element = element
  @options = options
  @options.dataType = if options.useProxy then 'json' else 'jsonp'
  @initialize()

Fluxiom.Chooser.prototype =

  initialize: ->
    assets = @assets = new Fluxiom.Collections.Assets(null, @options)
    selectedAssets = new Fluxiom.Collections.SelectedAssets()
    chooser = new Fluxiom.Views.Chooser({ collection: selectedAssets })
    @getTags = _.bind(@getTags, this)

    # get tags when assets are ready
    assets.bind('loaded', @getTags)

    # add assets > selected assets
    assets.bind('change:selected', _.bind(selectedAssets.toggleSelected, selectedAssets))

    # add selected assets > assets
    assets.bind('loaded', _.bind(assets.preSelect, assets, selectedAssets))

    # clear selected assets
    selectedAssets.bind('reset', _.bind(assets.clearSelected, assets))

  # this is needed for authorization in Firefox
  getTags: ->
    assets = @assets
    tags = new Fluxiom.Collections.Tags(null, @options)
    assets.unbind('loaded', @getTags)
    tags.bind('change:selected', _.bind(assets.filter, assets))


# extend jquery
$.widget.bridge('fluxiomChooser', Fluxiom.Chooser)
