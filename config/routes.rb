Rails.application.routes.draw do


  namespace :api do
    resources :links
  end

  root 'home#index'
end
