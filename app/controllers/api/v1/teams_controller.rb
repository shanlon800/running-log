class Api::V1::TeamsController < ApplicationController
  before_action :authorize_user
  skip_before_action :verify_authenticity_token, only: [:destroy, :show, :create]
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

  def create
    team = Team.new(team_params)
    if team.save
      Membership.create(user_id: current_user.id, team_id: team.id)
      Goal.create(team_id: team.id, team_goal: 0)
      user = User.find(current_user.id)
      render json: { belong_to_teams: user.teams, all_teams: Team.all }
    else
      render json: { error: team.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def team_params
    params.require(:team).permit(
      :team_name
    )
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
