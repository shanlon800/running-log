class Api::V1::WorkoutsController < ApplicationController
  before_action :authorize_user
  # skip_before_action :verify_authenticity_token, only: [:destroy]

  def index
    team = Team.find(params[:team_id])
    user = User.find(params[:user_id])
    workouts = Workout.where(user_id: user.id)
    render json: {team: team, user: user, workouts: workouts}
  end

  def authorize_user
    if !user_signed_in?
      raise ActionController::RoutingError.new("Not Found")
    end
  end
end
