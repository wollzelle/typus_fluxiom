module Typus
  module Fluxiom
    class Engine < ::Rails::Engine
      def initialize
        Typus::Fluxiom::Configuration.config!
        ActionView::Base.send(:include, Typus::Fluxiom::ApplicationHelper)
      end
    end
  end
end