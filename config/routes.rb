Rails.application.routes.draw do
  root 'static_pages#index'
  get '/weeks' => 'static_pages#index'
  get '/teams/:id' => 'static_pages#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      # resources :workouts
      resources :memberships, only: [:create]
      resources :goals, only: [:create]
      resources :users, only: [:index]
      resources :workouts, only: [:create, :update, :destroy]

      resources :teams, only: [:show] do
        resources :users do
          resources :workouts
        end
      end
    end
  end
end
