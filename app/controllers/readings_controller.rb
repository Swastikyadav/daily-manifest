class ReadingsController < ApplicationController
  before_action :load_manifest
  before_action :load_reading, only: [:update]

  def create
    if @manifest.readings.size == 0
      @reading = @manifest.readings.new(reading_params)
      @reading.save!
      render json: { status: :ok, reading: @reading }
    end
  end

  def update
    @reading.update!(reading_params)
    render json: { status: :ok, updated_reading: @reading }
  end

  private

    def load_manifest
      @manifest = Manifest.find_by!(id: params[:manifest_id])
    end

    def load_reading
      @reading = @manifest.readings.find_by!(id: params[:id])
    end

    def reading_params
      params.require(:reading)
        .permit(:read)
    end
end