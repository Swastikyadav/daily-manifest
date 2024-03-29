module Api::V1
  class ManifestsController < ApplicationController
    before_action :load_user
    before_action :load_manifest, except: [:create, :index]

    def index
      render json: { manifests: @user.manifests }
    end

    def show
      render json: ManifestService.new(@manifest).process, status: :ok
    end

    def create
      @manifest = @user.manifests.new(manifest_params)
      @manifest.save!
      render json: ManifestService.new(@manifest).process, status: :ok
    end

    def update
      @manifest.update!(manifest_params)
      render json: ManifestService.new(@manifest).process, status: :ok
    end

    def destroy
      if @manifest.destroy
        render json: { destroyed_manifest: @manifest }, status: :ok
      else
        render json: { errors: @manifest.errors.full_messages }, status: :bad_request
      end
    end

    private

      def load_user
        @user = User.find_by!(id: params[:registration_id])
      end

      def load_manifest
        @manifest = @user.manifests.find_by!(id: params[:id])
      end

      def manifest_params
        params.require(:manifest)
          .permit(
            :day,
            :date_of_manifest,
            reading_attributes: [:read],
            reflection_attributes: [reflection: [:text, :achieved]],
            microtask_attributes: [task: [:text]],
            goal_attributes: [macro: [:text, :tag], meezo: [:text, :tag]],
            habit_attributes: [good_habits: [:habit, :maintened], bad_habits: [:habit, :resisted]],
            schedule_attributes: [
              :day_starts_at,
              time_entry: [:first_half, :second_half]
            ]
          )
      end
  end
end