Rails.application.routes.draw do
  resource :sessions, only: [:create, :destroy] do
    get "logged_in", on: :member
  end

  resources :registrations, only: [:create, :destroy] do
    resources :manifests, only: [:index, :show, :create, :update, :destroy]
  end

  resources :manifests, only: [:show] do
    resource :microtasks, only: [:create, :update]
    resource :goals, only: [:create, :update]
    resource :habits, only: [:create, :update]
    resource :schedules, only: [:create, :update]
  end

  root to: "static#home"
end
