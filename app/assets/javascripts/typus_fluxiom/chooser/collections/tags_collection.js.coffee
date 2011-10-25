class Fluxiom.Collections.Tags extends Backbone.Collection

  model: Fluxiom.Models.Tag
  
  url: ->
    "#{@options.apiUrl}/tags.json"

  initialize: (models, options) ->
    @options = options
    @fetch({ dataType: @options.dataType })
    @view = new Fluxiom.Views.TagList({ collection: this })
  
  parse: (res) ->
    _.reject(res, (tag) -> tag.documents_count is 0)
