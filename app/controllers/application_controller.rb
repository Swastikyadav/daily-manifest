class ApplicationController < ActionController::Base
  include CurrentUserConcern
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  skip_before_action :verify_authenticity_token
  before_action :ensure_user_is_logged_in

  private

    def ensure_user_is_logged_in
      unless @current_user
        render json: { status: :unauthorized, msg: "Please log in first" }
      end
    end

    def ensure_user_is_not_logged_in
      if @current_user
        render json: { status: :unauthorized, msg: "You need to logout first to perform this action" }
      end
    end

    def record_not_found
      render json: { status: :not_found, msg: "No record found" }
    end
end
