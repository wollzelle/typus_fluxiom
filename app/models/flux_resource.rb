require 'net/http'

class FluxResource < ActiveResource::Base
  FLUXIOM_API = FluxAssets::Configuration.config  
  FLUXIOM_SITE = (FLUXIOM_API['ssl'] ? 'https' : 'http') + "://#{FLUXIOM_API['user']}:#{FLUXIOM_API['password']}@#{FLUXIOM_API['host']}/api"

end