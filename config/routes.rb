Rails.application.routes.draw do
  post '/upload' => 'application#upload'

  resources :images, only: [:show, :index] do
    member do
      get 'dontshow'
    end
  end

  root 'application#index'
end
