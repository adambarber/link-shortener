Rails.application.routes.draw do


  namespace :api do
    resources :links
  end
  constraints subdomain: 'l' do
    get "/:slug" => 'links/redirect#show'
  end

  root 'home#index'
end
