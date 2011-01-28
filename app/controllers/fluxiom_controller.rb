class FluxiomController < ApplicationController

  before_filter :set_cache

  if defined?(Typus::Authentication::const_get(Typus.authentication.to_s.classify))
    include Typus::Authentication::const_get(Typus.authentication.to_s.classify)
    before_filter :authenticate
  end

  layout 'fluxiom', :except => :list

  protect_from_forgery :only => [:create, :update, :destroy] 

  FLUXIOM_CONFIG = Fluxiom::Configuration.config
  DEFAULT_TAGS = Fluxiom::Configuration.config['default_tags'] || {}


  #Show the asset chooser
  def index
    #
    @multiple   = params[:multiple] || false
    @callback_function = params[:callback] || "Fluxiom.insertImage"
    @assets ||= FluxiomAsset.search('')#, params[:term], params[:tags])
    
    #select tags
    @tags ||= begin
      tags = []
      @assets.each { |a| tags = tags | a.tags }
      tags
    end
    
  end


  def list

    tags = "images" + (params[:tags] ? " #{params[:tags]}" : '')
    @alltags = FluxiomTag.allTags
    @assets = FluxiomAsset.search('', tags)#, params[:term], params[:tags])
    @baseURL = "#{(FLUXIOM_CONFIG['ssl'] ? 'http' : 'http')}://#{FLUXIOM_CONFIG['host']}"
    respond_to do |format|
        format.json
        format.html# render :template => '/admin/flux_assets/list', :layout => false
    end
  end

  def tags
    render :text => FluxiomTag.allTags.to_json, :layout => false
  end

  def set_cache
    response.headers['Cache-Control'] = 'public, max-age=300'
  end

end