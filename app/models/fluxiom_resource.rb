require 'net/http'

class FluxiomResource < ActiveResource::Base
  FLUXIOM_API = Fluxiom::Configuration.config  
  FLUXIOM_SITE = FLUXIOM_API['host'] #(FLUXIOM_API['ssl'] ? 'https' : 'http') + "://#{FLUXIOM_API['user']}:#{FLUXIOM_API['password']}@#{FLUXIOM_API['host']}/api"
end