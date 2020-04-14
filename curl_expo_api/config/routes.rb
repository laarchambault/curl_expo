Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  #refactor with resources: only
  post '/login', to: 'users#login'
  post '/users', to: 'users#create'
  get '/products', to: 'products#index'
  get '/products/:id', to: 'products#show'
  post '/products', to: 'products#create'
  post '/reviews', to: 'reviews#create'
end
