class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:destroy]

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

  def show
    user = User.find(params[:id])
    workouts = user.workouts
    render json: {user: user, workouts: workouts}
  end
end
