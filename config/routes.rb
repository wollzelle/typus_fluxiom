Rails.application.routes.draw do
  resources :fluxiom, :only => [:index] do
    get :list, :on => :collection
  end
end