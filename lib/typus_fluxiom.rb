module Typus
  module Fluxiom
    if defined?(Rails)
      require "jquery-rails"
      require "rails-backbone"
      require "eco"
      require "fluxiom/configuration"
      require "fluxiom/engine"
      require "fluxiom/helpers"
      require "fluxiom/version"
    end

    if defined?(ActiveRecord)
      require 'fluxiom/class_methods'
      ActiveRecord::Base.extend(Typus::Fluxiom::ClassMethods)
    end
    
  end
end