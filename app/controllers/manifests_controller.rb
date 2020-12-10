class ManifestsController < ApplicationController
  before_action :load_user
  before_action :load_manifest, except: [:create]

  def show
    render json: { manifest: @manifest }
  end

  def create
    @manifest = @user.manifests.new(manifest_params)
    @manifest.save!
    render json: { status: :ok, manifest: @manifest }
  end

  def update
    @manifest.update!(manifest_params)
    render json: { status: :ok, updated_manifest: @manifest }
  end

  def destroy
    if @manifest.destroy
      render json: { status: :ok, destroyed_manifest: @manifest }
    else
      render json: { status: :bad_request, errors: @manifest.errors.full_messages }
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
        .permit(:day, :date_of_manifest)
    end
end