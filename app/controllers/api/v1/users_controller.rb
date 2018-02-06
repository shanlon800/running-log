class Api::V1::UsersController < ApplicationController
  # skip_before_action :verify_authenticity_token, only: [:destroy]


  def index
    if current_user
      @current_user = current_user
      @workouts = Workout.where(user_id: @current_user.id)
      @teams = @current_user.teams

      @current_week_start = Date.today.beginning_of_week
      @current_week_end = Date.today.at_end_of_week
      @current_week = Workout.where("workout_date >= ? AND workout_date <= ?", @current_week_start, @current_week_end).order(:workout_date)
      @one_back = Workout.where("workout_date >= ? AND workout_date <= ?", (@current_week_start - 7), (@current_week_end - 7))
      @two_back = Workout.where("workout_date >= ? AND workout_date <= ?", (@current_week_start - 14), (@current_week_end - 14))
      @three_back = Workout.where("workout_date >= ? AND workout_date <= ?", (@current_week_start - 21), (@current_week_end - 21))
      @four_back = Workout.where("workout_date >= ? AND workout_date <= ?", (@current_week_start - 28), (@current_week_end - 28))



      render json: {
        current_user: @current_user,
        workouts: @workouts,
        teams: @teams,
        current_week: @current_week,
        one_week_back: @one_back,
        two_week_back: @two_back,
        three_week_back: @three_back,
        four_week_back: @four_back
      }
    else
      render json: {current_user: nil, message: "Please sign in.", status: 401}
    end
  end
end
