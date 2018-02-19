class Api::V1::UsersController < ApplicationController
  # skip_before_action :verify_authenticity_token, only: [:destroy]


  def index
    if current_user
      @all_teams = Team.all
      @teams = @current_user.teams
      year_to_date_workouts = Workout.year_to_date_workouts(current_user)
      @workouts = Workout.all
      num_of_workouts_completed = User.find(current_user.id).workouts.length


        if current_user.provider == 'strava'
          strava_info =  HTTParty.get("https://www.strava.com/api/v3/athletes/#{current_user.uid}/stats?access_token=#{ENV['STRAVA_TOKEN']}")
          year_to_date_strava = strava_info['ytd_run_totals']
          all_workouts_before_strava = Workout.where(user_id: current_user.id)
          strava_workouts = HTTParty.get("https://www.strava.com/api/v3/athletes/#{current_user.uid}/activities?access_token=#{ENV['STRAVA_TOKEN']}")

          Workout.add_strava_workouts(strava_workouts, all_workouts_before_strava, current_user)

        end



      @teams_with_goals = []
      @teams.each do |team|
        team_goal = {team: team, goal: team.goal}
        @teams_with_goals << team_goal
      end

      # maybe move to models?
      miles_to_date = 0
      minutes_to_date = 0

      year_to_date_workouts.each do |workout|
        miles_to_date += workout.distance
        minutes_to_date += workout.time
      end

      if num_of_workouts_completed > 0
        year_to_date_pace = Workout.calculate_pace(current_user, Date.today.beginning_of_year, Date.today, miles_to_date, minutes_to_date)
      else
        year_to_date_pace = "0"
      end

      if num_of_workouts_completed > 0
        seconds_per_mile_ytd = (minutes_to_date * 60) / miles_to_date
      else
        seconds_per_mile_ytd = "0"
      end

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

      if @current_week_workouts.length > 0
        week_to_date_pace = Workout.calculate_pace(current_user, Date.today.beginning_of_week, Date.today.at_end_of_week, total_miles_week, total_minutes_week)
      else
        week_to_date_pace = '0'
      end

      if @current_week_workouts.length > 0
        seconds_per_mile_current_week = (total_minutes_week * 60) / total_miles_week
      else
        seconds_per_mile_current_week = '0'
      end

      if @current_week_workouts.length > 0
        pace_rate_change = (((seconds_per_mile_current_week - seconds_per_mile_ytd)/seconds_per_mile_ytd) * 100).round(1)
      else
        pace_rate_change = '0'
      end

      if @current_week_workouts.length > 0
        average_miles_per_day = (total_miles_week / @current_week_workouts.length).round(1)
        average_miles_per_day_year_to_date = (miles_to_date / year_to_date_workouts.count).round(1)
        average_miles_change = (((average_miles_per_day - average_miles_per_day_year_to_date)/average_miles_per_day_year_to_date) * 100).round(1)
      else
        average_miles_per_day = '0'
        average_miles_per_day_year_to_date = '0'
        average_miles_change = '0'
      end
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

      week_start = start_date = Date.today.beginning_of_week
      week_end = end_date = Date.today.at_end_of_week
      current_week_all_dates = Array(week_start..week_end)

      user_current_week_workouts_dates = []

      @current_week_workouts.each do |workout|
        user_current_week_workouts_dates << workout.workout_date
      end

      week_dropdown = current_week_all_dates - user_current_week_workouts_dates



      render json: {
        current_user: @current_user,
        workouts: @workouts,
        belong_to_teams: @teams_with_goals,
        all_teams: @all_teams,
        current_week: @current_week_workouts,
        year_to_date_miles: miles_to_date,
        year_to_date_minutes: minutes_to_date,
        week_dropdown: week_dropdown,
        current_week_index_statistics:{
          week_start: week_start,
          week_end: week_end,
          total_miles: total_miles_week,
          average_pace: week_to_date_pace,
          average_miles_per_day: average_miles_per_day,
          pace_rate_change: pace_rate_change,
          average_miles_change: average_miles_change
        },
        year_to_date_index_statistics:{
            total_miles_year_to_date: miles_to_date,
            year_to_date_avg_pace: year_to_date_pace,
            days_run_in_row: running_date_streak,
            average_miles_per_day_year_to_date: average_miles_per_day_year_to_date,
            year_to_date_strava: year_to_date_strava
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
