require "typus_flux_assets"
require "rails"

module FluxAssets
 class Engine < Rails::Engine
   
   def initialize
     FluxAssets::Configuration.config!
     # Cms::FormBuilder.send(:include, Cms::Fluxiom::FormBuilder)
     ActionView::Base.send(:include, FluxAssets::ApplicationHelper)
   end
     
  end
end