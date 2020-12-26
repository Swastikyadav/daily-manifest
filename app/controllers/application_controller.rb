class ApplicationController < ActionController::Base
  include CurrentUserConcern
  rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  skip_before_action :verify_authenticity_token
  before_action :ensure_user_is_logged_in, except: [:fallback_index_html]

  def fallback_index_html
    render :file => "public/index.html"
  end

  private

    def ensure_user_is_logged_in
      unless @current_user
        render json: { msg: "Please log in first" }, status: :unauthorized
      end
    end

    def ensure_user_is_logged_out
      if @current_user
        render json: { msg: "You need to logout first to perform this action" }, status: :unauthorized
      end
    end

    def record_invalid(exception)
      render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end

    def record_not_found(exception)
      render json: { errors: exception.message }, status: :not_found
    end
end
