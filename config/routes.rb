Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resource :sessions, only: [:create, :destroy] do
        get "logged_in", on: :member
      end
    
      resources :registrations, only: [:create, :destroy] do
        resources :manifests, only: [:index, :show, :create, :update, :destroy]
      end
    end
  end

  root to: "static#home"
  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
