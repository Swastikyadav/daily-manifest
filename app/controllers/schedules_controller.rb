class SchedulesController < ApplicationController
  before_action :load_manifest
  before_action :load_schedule, only: [:update]

  def create
    if @manifest.schedules.size == 0
      @schedule = @manifest.schedules.new(schedule_params)
      @schedule.save!
      render json: { schedule: @schedule, day_starts_at: @schedule.day_starts_at.strftime("%I:%M %p") }, status: :ok
    end
  end

  def update
    @schedule.update!(schedule_params)
    render json: { updated_schedule: @schedule, day_starts_at: @schedule.day_starts_at.strftime("%I:%M %p") }, status: :ok
  end

  private

    def load_manifest
      @manifest = Manifest.find_by!(id: params[:manifest_id])
    end

    def load_schedule
      @schedule = @manifest.schedules.first
    end

    def schedule_params
      params.require(:schedule)
        .permit(:day_starts_at, :time_entry => [:first_half, :second_half])
    end
end