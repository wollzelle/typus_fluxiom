module Fluxiom
  if defined?(Rails)
    require "typus_fluxiom/configuration"
    require "typus_fluxiom/engine"
    require "typus_fluxiom/helpers"
    require "typus_fluxiom/version"
  end
end