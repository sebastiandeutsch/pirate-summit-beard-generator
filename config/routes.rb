Rails.application.routes.draw do
  post '/upload' => 'application#upload'

  resources :images, only: [:show]

  root 'application#index'
end
