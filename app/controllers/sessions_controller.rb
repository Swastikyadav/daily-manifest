class SessionsController < ApplicationController
  include CurrentUserConcern
  skip_before_action :ensure_user_is_logged_in, except: [:destroy]
  before_action :ensure_user_is_logged_out, only: [:create]

  def create
    user = User
            .find_by(email: params["user"]["email"])
            .try(:authenticate, params["user"]["password"])

    if user
      session[:user_id] = user.id
      render json: { logged_in: true, user: user }, status: :created
    else
      render json: { logged_in: false, errors: ["Invalid login credentials"] }, status: :unprocessable_entity
    end
  end

  def destroy
    reset_session
    render json: { logged_out: true }, status: :ok
  end

  def logged_in
    if @current_user
      render json: { logged_in: true, user: @current_user }, status: :ok
    else
      render json: { logged_in: false }, status: :ok
    end
  end
end