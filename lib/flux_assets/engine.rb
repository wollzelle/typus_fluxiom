require "typus_flux_assets"
require "rails"

module FluxAssets
 class Engine < Rails::Engine
   
   def initialize
     FluxAssets::Configuration.config!
   end
     
  end
end