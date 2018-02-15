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

      year_to_date_pace = Workout.calculate_pace(current_user, Date.today.beginning_of_year, Date.today, miles_to_date, minutes_to_date)


      @current_week_workouts = Workout.current_week_workouts(current_user)
      @one_week_back_workouts = Workout.prior_week_workouts(1, current_user)
      @two_week_back_workouts = Workout.prior_week_workouts(2, current_user)
      @three_week_back_workouts = Workout.prior_week_workouts(3, current_user)
      @four_week_back_workouts = Workout.prior_week_workouts(4, current_user)


      total_miles_week = 0
      total_minutes_week = 0

      @current_week_workouts.each do |workout|
        total_miles_week += workout.distance
        total_minutes_week += workout.time
      end

      week_to_date_pace = Workout.calculate_pace(current_user, Date.today.beginning_of_week, Date.today.at_end_of_week, total_miles_week, total_minutes_week)


      date_from = Date.today.beginning_of_year
      date_to = Date.today

      all_dates_year_to_date = Array(date_from..date_to)

      date_of_workouts_year_to_date = []
      year_to_date_workouts.each do |workout|
        date_of_workouts_year_to_date << workout.workout_date
      end

      missing_dates = all_dates_year_to_date - date_of_workouts_year_to_date
      last_date_missed = missing_dates.sort!.last
      running_date_streak = (Date.today - last_date_missed).to_i



      render json: {
        current_user: @current_user,
        workouts: @workouts,
        belong_to_teams: @teams,
        all_teams: @all_teams,
        current_week: @current_week_workouts,
        year_to_date_miles: miles_to_date,
        year_to_date_minutes: minutes_to_date,
        current_week_index_statistics:{
          total_miles: total_miles_week,
          average_pace: week_to_date_pace,
          average_miles_per_day: (total_miles_week/7).round(2)
        },
        year_to_date_index_statistics:{
            total_miles_year_to_date: miles_to_date,
            year_to_date_avg_pace: year_to_date_pace,
            days_run_in_row: running_date_streak
        },
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
