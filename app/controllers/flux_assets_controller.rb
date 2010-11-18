class FluxAssetsController < ApplicationController

  if defined?(Typus::Authentication::const_get(Typus.authentication.to_s.classify))
    include Typus::Authentication::const_get(Typus.authentication.to_s.classify)
    before_filter :authenticate
  end

  layout 'flux_assets', :except => :list

  protect_from_forgery :only => [:create, :update, :destroy] 

  FLUXIOM_CONFIG = FluxAssets::Configuration.config
  DEFAULT_TAGS = FluxAssets::Configuration.config['default_tags'] || {}


  #Show the asset chooser
  def index
    #
    @multiple   = params[:multiple] || false
    @callback_function = params[:callback] || "Fluxiom.insertImage"
    @assets ||= FluxAsset.search('')#, params[:term], params[:tags])
    
    #select tags
    @tags ||= begin
      tags = []
      @assets.each { |a| tags = tags | a.tags }
      tags
    end
    
  end


  def list

    tags = "images" + (params[:tags] ? " #{params[:tags]}" : '')
    @alltags = FluxTag.allTags
    @assets = FluxAsset.search('', tags)#, params[:term], params[:tags])
    @baseURL = "#{(FLUXIOM_CONFIG['ssl'] ? 'http' : 'http')}://#{FLUXIOM_CONFIG['host']}"
    respond_to do |format|
        format.json
        format.html# render :template => '/admin/flux_assets/list', :layout => false
    end
  end

  def tags
    render :text => FluxTag.allTags.to_json, :layout => false
  end

end