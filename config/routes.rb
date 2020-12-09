Rails.application.routes.draw do
  resources :sessions, only: [:create, :destroy] do
    get "logged_in", on: :member
  end
  resources :registrations, only: [:create, :destroy]
  root to: "static#home"
end
