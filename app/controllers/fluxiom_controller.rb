class FluxiomController < ApplicationController

  before_filter :set_cache

  # if defined?(Typus::Authentication::const_get(Typus.authentication.to_s.classify))
  #   include Typus::Authentication::const_get(Typus.authentication.to_s.classify)
  #   before_filter :authenticate
  # end

  protect_from_forgery :only => [:create, :update, :destroy] 

  FLUXIOM_CONFIG = Fluxiom::Configuration.config
  DEFAULT_TAGS = Fluxiom::Configuration.config['default_tags'] || {}


  # show the asset chooser
  def index
    # @assets ||= FluxiomAsset.search('')#, params[:term], params[:tags])
    # 
    # # select tags
    # @tags ||= begin
    #   tags = []
    #   @assets.each do |a| 
    #     #get the asset tags – if there is a filter tag defined in the config, remove it from the main tags and assign it to @filter_tag
    #     asset_tags = a.tags.delete_if { |t|
    #       is_filter_tag = t.tag == FluxiomAsset::FILTER_TAG
    #       @filter_tag = t if is_filter_tag
    #       is_filter_tag
    #     } if FluxiomAsset::FILTER_TAG
    #     tags = tags | asset_tags
    #   end
    #   tags
    # end    
    # 
    render :layout => false
  end

  def list
    tags = "images" + (params[:tags] ? " #{params[:tags]}" : '')
    @alltags = FluxiomTag.allTags
    @assets = FluxiomAsset.search('', tags)#, params[:term], params[:tags])
    @baseURL = "#{(FLUXIOM_CONFIG['ssl'] ? 'http' : 'http')}://#{FLUXIOM_CONFIG['host']}"
    respond_to do |format|
        format.json
        format.html
    end
  end

  def tags
    render :text => FluxiomTag.allTags.to_json, :layout => false
  end

  def set_cache
    response.headers['Cache-Control'] = 'public, max-age=300' unless Rails.env.development?
  end

end