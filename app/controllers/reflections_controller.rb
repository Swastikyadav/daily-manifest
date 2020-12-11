class ReflectionsController < ApplicationController
  before_action :load_manifest
  before_action :load_reflection, only: [:update]
  
  def create
    @reflection = @manifest.reflections.new(reflection_params)
    @reflection.save!
    render json: { reflection: @reflection }, status: :ok
  end

  def update
    @reflection.update!(reflection_params)
    render json: { updated_reflection: @reflection }, status: :ok
  end

  private

    def load_manifest
      @manifest = Manifest.find_by!(id: params[:manifest_id])
    end

    def load_reflection
      @reflection = @manifest.reflections.first!
    end

    def reflection_params
      params.require(:reflect)
        .permit(:reflection => [:text, :achieved])
    end
end