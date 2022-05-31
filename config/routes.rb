Rails.application.routes.draw do
  # Home page
  root to: 'static_pages#home'

  # Static pages
  get '/property/:id' => 'static_pages#property'
  get '/login'        => 'static_pages#login'

  namespace :api do
    resources :users, only: [:create]
    resource :sessions, only: [:create, :destroy]
    resources :properties, only: [:index, :show]
    resources :bookings, only: [:create]
    resources :charges, only: [:create]

    get '/authenticated' => 'sessions#authenticated'
    get '/properties/:id/bookings' => 'bookings#get_property_bookings'

  end

  # Stripe Webhook
  post 'charges/mark_complete' => 'charges#mark_complete'

end