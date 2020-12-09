class SessionsController < ApplicationController
  include CurrentUserConcern
  skip_before_action :ensure_user_is_logged_in, except: [:destroy]
  before_action :ensure_user_is_not_logged_in, except: [:destroy]

  def create
    user = User
            .find_by(email: params["user"]["email"])
            .try(:authenticate, params["user"]["password"])

    if user
      session[:user_id] = user.id
      render json: { status: :created, logged_in: true, user: user }
    else
      render json: { status: :unprocessable_entity, errors: user.errors.full_messages }
    end
  end

  def destroy
    reset_session
    render json: { status: 200, logged_out: true }
  end

  def logged_in
    if @current_user
      render json: { logged_in: true, user: @current_user }
    else
      render json: { logged_in: false }
    end
  end
end