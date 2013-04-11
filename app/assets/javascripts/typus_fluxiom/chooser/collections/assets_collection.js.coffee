class Fluxiom.Collections.Assets extends Backbone.Collection

  model: Fluxiom.Models.Asset

  url: ->
    "#{@options.apiUrl}/assets.json"

  page: 1

  tag: null

  initialize: (models, options) ->
    @options = options
    @bind('reset', @handleReset)
    @view = new Fluxiom.Views.AssetList({ collection: this, baseUrl: @options.baseUrl })
    @fetchAssets()

  parse: (res) ->
    @lastPage = res.length < @options.perPage
    return _.reject(res, (asset) -> return asset.public_url == null )

  fetchAssets: ->
    page = @page++ # page = 1, @page = 2
    data = { page: page, per_page: @options.perPage }

    # if (@tag) data.tags += ',' + @tag
    data.tags = @tag if @tag

    @fetch({
      dataType: @options.dataType,
      add: 'add',
      data: data,
      success: @handleSuccess
    })

  clearSelected: ->
    @each((model) -> model.set({ selected: false }))

  filter: (tag, selected) ->
    @reset()
    @tag = tag.id if selected
    @fetchAssets()

  handleSuccess: (collection, response) =>
    @trigger('loaded', collection)

  handleReset: =>
    @page = 1
    @tag = null

  preSelect: (selected) ->
    self = this
    ids  = _.uniq(selected.pluck('id'))
    ids.forEach((id) ->
      match = self.get(id)
      match.set({ selected: true }) if (match)
    )