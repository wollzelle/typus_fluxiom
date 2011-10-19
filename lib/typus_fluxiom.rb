module Typus
  module Fluxiom
    if defined?(Rails)
      require "jquery-rails"
      require "rails-backbone"
      require "ejs"
      require "fluxiom/configuration"
      require "fluxiom/engine"
      require "fluxiom/helpers"
      require "fluxiom/version"
    end
  end
end