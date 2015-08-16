Rails.application.routes.draw do
  post '/upload' => 'application#upload'
  get '/print'   => 'application#print'

  resources :images, only: [:show]

  root 'application#index'
end
