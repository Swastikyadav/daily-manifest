class MicrotasksController < ApplicationController
  before_action :load_manifest
  before_action :load_microtask, only: [:update]

  def create
    @microtask = @manifest.microtasks.new(microtask_params)
    @microtask.save!
    render json: { microtask: @microtask }, status: :ok
  end

  def update
    @microtask.update!(microtask_params)
    render json: { updated_microtask: @microtask }, status: :ok
  end

  private

    def load_manifest
      @manifest = Manifest.find_by!(id: params[:manifest_id])
    end

    def load_microtask
      @microtask = @manifest.microtasks.first!
    end

    def microtask_params
      params.require(:micro)
        .permit(:task)
    end
end