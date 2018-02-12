class Api::V1::TeamsController < ApplicationController
  before_action :authorize_user
  # skip_before_action :verify_authenticity_token, only: [:destroy, :show]
  # def index
  #   @team = Team.find(params[:id])
  #   @users = @team.users
  #   render json: {users: @users}
  # end

  def show
    @current_week_start = Date.today.beginning_of_week
    @current_week_end = Date.today.at_end_of_week

    @team = Team.find(params[:id])
    @users = @team.users

    if @team.goal == nil
      @goal = 0
    else
      @goal = @team.goal
    end

    @user_workouts = []
    @users.each do |user|
      workout_collection = {user: user, workouts: user.workouts.where("workout_date >= ? AND workout_date <= ?", (@current_week_start), (@current_week_end)).order(:workout_date)}
      @user_workouts << workout_collection
    end

    render json: {team: @team, goal: @goal.team_goal, users: @user_workouts}
  end

  def authorize_user
    if !user_signed_in?
      raise ActionController::RoutingError.new("Not Found")
    end
  end

  # def calculateWeek(weeksBack)
  #   Workout.where("workout_date >= ? AND workout_date <= ?", (@current_week_start - (weeksBack * 7)), (@current_week_end - (weeksBack * 7)))
  # end
end
