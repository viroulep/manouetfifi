Rails.application.routes.draw do
  get 'tables/plan'
  resources :tables
  get 'admin/index'
  resources :guests
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'sessions#home'
  get '/wca_callback' => 'sessions#create'
  get '/signin' => 'sessions#new', :as => :signin
  post '/signin_with_wca' => 'sessions#signin_with_wca', :as => :signin_with_wca
  get '/signout' => 'sessions#destroy', :as => :signout
end
