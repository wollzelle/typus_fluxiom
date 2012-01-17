module Typus
  module Fluxiom
    class Engine < ::Rails::Engine
      def initialize
        Typus::Fluxiom::Configuration.config!
      end
    end
  end
end