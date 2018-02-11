class Api::V1::GoalsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def create
    goal = Goal.new(goal_params)
    if goal.save
      render json: goal.team_goal
    else
      render json: { error: review.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def goal_params
    params.require(:goal).permit(
      :team_id,
      :team_goal
    )
  end
end
