Rails.application.routes.draw do
  namespace :admin do
    resources :fluxiom, :only => [:index] do
      get :assets, :on => :collection
      get :tags, :on => :collection
    end
  end
end