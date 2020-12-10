Rails.application.routes.draw do
  resource :sessions, only: [:create, :destroy] do
    get "logged_in", on: :member
  end
  resources :registrations, only: [:create, :destroy] do
    resources :manifests, only: [:create, :show, :update, :destroy]
  end
  root to: "static#home"
end
