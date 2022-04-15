Rails.application.routes.draw do
  root to: 'static_pages#home'

  namespace :api do
    # Add routes below this line
    resources :users, only: [:create]
    resources :sessions, only: [:create, :destroy]
    resources :properties, only: [:index, :show]

    get '/authenticated' => 'sessions#authenticated'

  end

end
