class FluxiomController < ApplicationController

  if defined?(Typus::Authentication::const_get(Typus.authentication.to_s.classify))
    include Typus::Authentication::const_get(Typus.authentication.to_s.classify)
    before_filter :authenticate
  end

  before_filter :set_cache
  before_filter :prepare_params

  # show the asset chooser
  def index
    render :layout => false
  end

  def assets
    respond_to do |format|
      format.json { render :json => proxy_call("/assets.json?#{request.query_string}") }
    end
  end

  def tags
    respond_to do |format|
      format.json { render :json => proxy_call('/tags.json') }
    end
  end

private

  def prepare_params    
    return if @base_url
    @use_proxy ||= Typus::Fluxiom.config.proxy
    @ssl ||= Typus::Fluxiom.config.ssl
    @scheme ||= @ssl ? 'https' : 'http'
    @host = Typus::Fluxiom.config.host 
    @url ||= begin
      if @use_proxy
        "#{@scheme}://#{Typus::Fluxiom.config.host}/api"
      else
        "#{@scheme}://#{Typus::Fluxiom.config.user}:#{Typus::Fluxiom.config.password}@#{Typus::Fluxiom.config.host}/api"
      end
    end
    @api_url ||= @use_proxy ? '/fluxiom' : @url
    @base_url = "#{@scheme}://#{@host}"
  end

  def proxy_call(path)
    u = URI.parse(@url)
    http = Net::HTTP.new(u.host,u.port)
    req = Net::HTTP::Get.new(u.path + path)
    http.use_ssl = @ssl
    req.basic_auth Typus::Fluxiom.config.user, Typus::Fluxiom.config.password
    response = http.request(req)
    return response.body
  end
  
  def set_cache
    response.headers['Cache-Control'] = 'public, max-age=30' unless Rails.env.development?
  end
  
end