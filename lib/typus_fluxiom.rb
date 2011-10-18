module Fluxiom
  if defined?(Rails)
    require "fluxiom/configuration"
    require "fluxiom/engine"
    require "fluxiom/helpers"
    require "fluxiom/version"
  end
end