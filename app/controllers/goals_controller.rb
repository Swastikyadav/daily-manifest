class GoalsController < ApplicationController
  before_action :load_manifest
  before_action :load_goal, only: [:update]

  def create
    @goal = @manifest.goals.new(goal_params)
    @goal.save!
    render json: { goal: @goal }, status: :ok
  end

  def update
    @goal.update!(goal_params)
    render json: { update_goal: @goal }, status: :ok
  end

  private

    def load_manifest
      @manifest = Manifest.find_by!(id: params[:manifest_id])
    end

    def load_goal
      @goal = @manifest.goals.first!
    end

    def goal_params
      params.require(:goal)
        .permit(:macro => [:text, :tag], :meezo => [:text, :tag])
    end
end