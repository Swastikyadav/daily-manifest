class RegistrationsController < ApplicationController
  before_action :ensure_user_is_not_logged_in, except: [:destroy]

  def create
    user = User.create!(registration_params)

    if user
      session[:user_id] = user.id
      render json: { status: :created, user: user }
    else
      render json: { status: :unprocessable_entity, errors: user.errors.full_messages }
    end
  end

  def destroy
    # before deleting user check (@current_user.id === user.id)
    render json: { msg: "destroy user" }
  end

  private

    def registration_params
      params.require(:user)
        .permit(:email, :password, :password_confirmation)
    end
end