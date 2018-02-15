class Api::V1::UsersController < ApplicationController
  # skip_before_action :verify_authenticity_token, only: [:destroy]


  def index
    if current_user
      @all_teams = Team.all
      @teams = @current_user.teams
      year_to_date_workouts = Workout.year_to_date_workouts(current_user)

      # maybe move to models?
      miles_to_date = 0
      minutes_to_date = 0

      year_to_date_workouts.each do |workout|
        miles_to_date += workout.distance
        minutes_to_date += workout.time
      end




      @current_week_workouts = Workout.current_week_workouts(current_user)
      @one_week_back_workouts = Workout.prior_week_workouts(1, current_user)
      @two_week_back_workouts = Workout.prior_week_workouts(2, current_user)
      @three_week_back_workouts = Workout.prior_week_workouts(3, current_user)
      @four_week_back_workouts = Workout.prior_week_workouts(4, current_user)


      render json: {
        current_user: @current_user,
        workouts: @workouts,
        belong_to_teams: @teams,
        all_teams: @all_teams,
        current_week: @current_week_workouts,
        year_to_date_miles: miles_to_date,
        year_to_date_minutes: minutes_to_date,
        # current_week_index_statistics:{
        #   total_miles:
        #   average_pace:
        #   average_miles_per_day:
        # },
        # year_to_date_index_statistics:{
        #     total_miles_year_to_date: miles_to_date
        #     year_to_date_avg_pace:
        #     days_run_in_row:
        #     total_calories_burned:
        # },
        past_weeks:{
          one_week_back: @one_week_back_workouts,
          two_week_back: @two_week_back_workouts,
          three_week_back: @three_week_back_workouts,
          four_week_back: @four_week_back_workouts
        }
      }
    else
      render json: {current_user: nil, message: "Please sign in.", status: 401}
    end
  end


end
