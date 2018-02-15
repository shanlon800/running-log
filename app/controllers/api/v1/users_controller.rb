class Api::V1::UsersController < ApplicationController
  # skip_before_action :verify_authenticity_token, only: [:destroy]


  def index
    if current_user
      @all_teams = Team.all
      @current_user = current_user
      @workouts = Workout.where(user_id: @current_user.id)
      @teams = @current_user.teams

      @current_week_start = Date.today.beginning_of_week
      @current_week_end = Date.today.at_end_of_week
      @current_week_all_users = calculateWeek(0).order(:workout_date)

      year_to_date_workouts = @workouts.where("workout_date >= ? AND workout_date <= ?", Date.today.beginning_of_year, Date.today)
      miles_to_date = 0
      minutes_to_date = 0

      year_to_date_workouts.each do |workout|
        miles_to_date += workout.distance
        minutes_to_date += workout.time
      end


      workouts_selected = []
      @current_week_all_users.each do |workout|
        if workout.user_id == @current_user.id
          workouts_selected << workout
        end
      end


      @current_week = workouts_selected
      @one_back = @current_user.workouts.where("workout_date >= ? AND workout_date <= ?", (@current_week_start - (7)), (@current_week_end - (7))).order(:workout_date)
      @two_back = @current_user.workouts.where("workout_date >= ? AND workout_date <= ?", (@current_week_start - (14)), (@current_week_end - (14))).order(:workout_date)
      @three_back = @current_user.workouts.where("workout_date >= ? AND workout_date <= ?", (@current_week_start - (21)), (@current_week_end - (21))).order(:workout_date)
      @four_back = @current_user.workouts.where("workout_date >= ? AND workout_date <= ?", (@current_week_start - (28)), (@current_week_end - (28))).order(:workout_date)


      render json: {
        current_user: @current_user,
        workouts: @workouts,
        belong_to_teams: @teams,
        all_teams: @all_teams,
        current_week: @current_week,
        year_to_date_miles: miles_to_date,
        year_to_date_minutes: minutes_to_date,
        past_weeks:{
          one_week_back: @one_back,
          two_week_back: @two_back,
          three_week_back: @three_back,
          four_week_back: @four_back
        }
      }
    else
      render json: {current_user: nil, message: "Please sign in.", status: 401}
    end
  end


end
