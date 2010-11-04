module FluxAssets
  if defined?(Rails)
    require 'flux_assets/engine' 
  end

  autoload :Configuration, "flux_assets/configuration"

end

