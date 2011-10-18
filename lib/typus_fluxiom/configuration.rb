require "rails"

module Fluxiom
  module Configuration

    def self.config!
      @@config = {}
      file = Rails.root.join("config/fluxiom.yml")
      raise "Error make sure the configuration file (#{file}) exists!" unless File.exists?(file)
      if data = YAML::load_file(file)
        @@config = OpenStruct.new data
      end
      return @@config
    end

    mattr_accessor :config

  end
  
  def self.config
    Fluxiom::Configuration.config
  end

end