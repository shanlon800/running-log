class Api::V1::WorkoutsController < ApplicationController
  # skip_before_action :verify_authenticity_token, only: [:destroy]

  def index
    if current_user
      @current_user = current_user
      @workouts = Workout.where(user_id: @current_user.id)
      @teams = @current_user.teams
      render json: {current_user: @current_user, workouts: @workouts, teams: @teams}
    else
      render json: {current_user: nil, message: "Please sign in.", status: 401}
    end
  end
  
  # def authorize_user
  #   if !user_signed_in?
  #     raise ActionController::RoutingError.new("Not Found")
  #   end
  # end
end
