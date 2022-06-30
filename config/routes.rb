Rails.application.routes.draw do
  # Home page
  root to: 'static_pages#home'

  # Static pages
  get '/property/:id'  => 'static_pages#property'
  get '/login'         => 'static_pages#login'
  get '/mybookings'    => 'static_pages#users_bookings'

  namespace :api do
    resources :users, only: [:create]
    resource :sessions, only: [:create, :destroy]
    resources :properties, only: [:index, :show]
    resources :bookings, only: [:create]
    resources :charges, only: [:create]

    # Authenticate User
    get '/authenticated' => 'sessions#authenticated'

    # Get bookings 
    get '/properties/:id/bookings' => 'bookings#get_property_bookings'
    get '/:username/bookings'       => 'bookings#get_user_bookings'

    # Stripe Webhook
    post 'charges/mark_complete' => 'charges#mark_complete'

  end

end