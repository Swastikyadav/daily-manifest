class RegistrationsController < ApplicationController
  skip_before_action :ensure_user_is_logged_in, only: [:create]
  before_action :ensure_user_is_logged_out, only: [:create]

  def create
    user = User.new(registration_params)

    if user.save!
    session[:user_id] = user.id
    render json: { status: :created, user: user }
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