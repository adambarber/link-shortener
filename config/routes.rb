Rails.application.routes.draw do


  namespace :api do
    resources :links
  end
  constraints subdomain: 'l' do
    namespace :links do
      get "/:slug" => 'links/redirect#show'
    end
  end

  root 'home#index'
end
