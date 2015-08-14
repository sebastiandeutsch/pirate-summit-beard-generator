Rails.application.routes.draw do
  get '/print' => 'application#print'

  root 'application#index'
end
