class Api::V1::TeamsController < ApplicationController
  # skip_before_action :verify_authenticity_token, only: [:destroy]
  # def index
  #   @workouts = Workout.where("workout_date >= ? AND workout_date <= ?", Date.today.beginning_of_week, Date.today.at_end_of_week)
  # end

  # def show
  #   @team = Team.find(params[:id])
  #   @users = @team.users
  #   render json: {users: @users}
  # end

  # def authorize_user
  #   if !user_signed_in?
  #     raise ActionController::RoutingError.new("Not Found")
  #   end
  # end
end
