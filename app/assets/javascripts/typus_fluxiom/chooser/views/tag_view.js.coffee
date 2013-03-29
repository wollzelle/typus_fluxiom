class Fluxiom.Views.Tag extends Backbone.View

  tagName: 'span'
  template: JST['typus_fluxiom/chooser/templates/tag']

  events:
    'click .flux-tag' : 'select'

  paused: false

  initialize: ->
    @el = @$el
    @model.bind('change', @render)
    @render()

  render: =>
    @el.html(@template({
      id: @model.get('id')
      tag: @model.escape('tag')
      classes: 'active' if @model.get('selected')
    }))

  select: (e) ->
    if @model.get('selected') is true
      @model.set({ selected: false })
    else
      @model.set({ selected: true })
    e.preventDefault()
