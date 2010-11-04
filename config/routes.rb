Rails.application.routes.draw do |map|
#  namespace :admin do
    resources :flux_assets, :only => [:index] do
      get 'list', :on => :collection
    end
#  end
end
