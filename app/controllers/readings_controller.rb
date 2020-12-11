class ReadingsController < ApplicationController
  before_action :load_manifest
  before_action :load_reading, only: [:update]

  def create
    @reading = @manifest.readings.new(reading_params)
    @reading.save!
    render json: { status: :ok, reading: @reading }
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
      @reading = @manifest.readings.first!
    end

    def reading_params
      params.require(:reading)
        .permit(:read)
    end
end