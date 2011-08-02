Rails.application.routes.draw do
  resources :fluxiom, :only => [:index] do
    get :assets, :on => :collection
    get :tags, :on => :collection
  end
end