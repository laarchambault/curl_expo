Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  #refactor with resources: only
  post '/login', to: 'users#login'
  get '/users/:id', to: 'users#show'
  post '/users', to: 'users#create'
  patch '/users/:id', to: 'users#update'
  get '/products', to: 'products#index'
  get '/products/:id', to: 'products#show'
  post '/products', to: 'products#create'
  post '/reviews', to: 'reviews#create'
  get '/ingredients', to: 'ingredients#index'
  post '/ingredients', to: 'ingredients#create'
  post '/favorites', to: 'favorites#create'
  delete '/favorites/:id', to: 'favorites#destroy'
end
