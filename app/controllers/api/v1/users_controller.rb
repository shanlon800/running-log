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


      workouts_selected = []
      @current_week_all_users.each do |workout|
        if workout.user_id == @current_user.id
          workouts_selected << workout
        end
      end

      @current_week = workouts_selected
      @one_back = calculateWeek(1)
      @two_back = calculateWeek(2)
      @three_back = calculateWeek(3)
      @four_back = calculateWeek(4)


      render json: {
        current_user: @current_user,
        workouts: @workouts,
        belong_to_teams: @teams,
        all_teams: @all_teams,
        current_week: @current_week,
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
