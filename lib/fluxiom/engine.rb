require "typus_fluxiom"
require "rails"

module Fluxiom
 class Engine < Rails::Engine

   initializer "static assets" do |app|
         app.middleware.use ::ActionDispatch::Static, "#{root}/public"
   end     
   
   def initialize
     Fluxiom::Configuration.config!
     # Cms::FormBuilder.send(:include, Cms::Fluxiom::FormBuilder)
     ActionView::Base.send(:include, Fluxiom::ApplicationHelper)
   end
  end
end