Rails.application.routes.draw do
  root 'static_pages#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      # resources :workouts

      resources :users

      resources :teams do
        resources :users do
          resources :workouts
        end
      end
    end
  end
end
