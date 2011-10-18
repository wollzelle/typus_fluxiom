module Fluxiom
  class Engine < ::Rails::Engine
    def initialize
      Fluxiom::Configuration.config!
      ActionView::Base.send(:include, Fluxiom::ApplicationHelper)
    end
  end
end