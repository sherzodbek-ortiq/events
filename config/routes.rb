Rails.application.routes.draw do
  root 'home#index'
  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :events, only: [:index, :create, :destroy, :update]
    end
  end

end
