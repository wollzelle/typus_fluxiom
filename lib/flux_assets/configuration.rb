require "rails"

module FluxAssets

  module Configuration

    # Read configuration from <tt>config/typus/**/*.yml</tt>.
    def self.config!
      @@config = {}
      file = Rails.root.join("config/fluxiom.yml")
      raise "Error make sure the configuration file (#{file}) exists!" unless File.exists?(file)
      if data = YAML::load_file(file)
        @@config = data
      end

      return @@config
    end

    mattr_accessor :config



  end

end