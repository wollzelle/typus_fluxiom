module Fluxiom
  if defined?(Rails)
    require 'fluxiom/engine' 
    require "fluxiom/helpers"
  end

  autoload :Configuration, "fluxiom/configuration"
  autoload :Helpers, "fluxiom/helpers"

end

