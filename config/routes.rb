Rails.application.routes.draw do |map|
  namespace :admin do
    resources :fluxiom, :only => [:index] do
      get 'list', :on => :collection
    end
  end
end
