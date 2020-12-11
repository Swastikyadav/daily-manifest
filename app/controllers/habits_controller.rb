class HabitsController < ApplicationController
  before_action :load_manifest
  before_action :load_habit, only: [:update]

  def create
    @habit = @manifest.habits.new(habit_params)
    @habit.save!
    render json: { habit: @habit }, status: :ok
  end

  def update
    @habit.update!(habit_params)
    render json: { updated_habit: @habit }, status: :ok
  end

  private

    def load_manifest
      @manifest = Manifest.find_by!(id: params[:manifest_id])
    end

    def load_habit
      @habit = @manifest.habits.first!
    end

    def habit_params
      params.require(:habit)
        .permit(:good_habits => [:habit, :maintened], :bad_habits => [:habit, :resisted])
    end
end