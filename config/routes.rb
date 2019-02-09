Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  scope '(:locale)', locale: /#{I18n.available_locales.join('|')}/ do
    get '/:locale' => 'sessions#home'
    root 'sessions#home'
    get 'tables/plan'
    resources :tables
    get 'admin/index'
    resources :guests
    get '/wca_callback' => 'sessions#create'
    get '/signin' => 'sessions#new', :as => :signin
    post '/signin_with_wca' => 'sessions#signin_with_wca', :as => :signin_with_wca
    get '/signout' => 'sessions#destroy', :as => :signout
    get "/pages/:id" => "high_voltage/pages#show", :as => :page, :format => false
  end
end
