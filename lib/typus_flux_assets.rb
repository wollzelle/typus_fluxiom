module FluxAssets
  if defined?(Rails)
    require 'flux_assets/engine' 
    require "flux_assets/helpers"
  end

  autoload :Configuration, "flux_assets/configuration"
  autoload :Helpers, "flux_assets/helpers"

end

