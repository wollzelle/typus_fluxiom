class FluxAssetsController < ApplicationController

  if defined?(Typus::Authentication::const_get(Typus.authentication.to_s.classify))
    include Typus::Authentication::const_get(Typus.authentication.to_s.classify)
    before_filter :authenticate
  end

  layout 'flux_assets'

  protect_from_forgery :only => [:create, :update, :destroy] 

  FLUXIOM_CONFIG = FluxAssets::Configuration.config
  DEFAULT_TAGS = FluxAssets::Configuration.config['default_tags'] || {}

  #Show the asset chooser
  def index
    @tags = FluxTag.allTags
    @multiple   = params[:multiple] || false
    @callback_function = params[:callback] || "Fluxiom.insertImage"
    @active_tags = DEFAULT_TAGS[@asset_type].to_a
  end


  def list
    tags = "images" + (params[:tags] ? " #{params[:tags]}" : '')
    @assets = FluxAsset.search('', tags)#, params[:term], params[:tags])
    @baseURL = "#{(FLUXIOM_CONFIG['ssl'] ? 'http' : 'http')}://#{FLUXIOM_CONFIG['host']}"
    respond_to do |format|
        format.json
    end
  end

  def tags
    render :text => FluxTag.allTags.to_json, :layout => false
  end

end