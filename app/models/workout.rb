class Workout < ApplicationRecord
  belongs_to :user

  validates :run_type, presence: true
  validates :distance, presence: true, numericality: { :greater_than_or_equal_to => 0}
  validates :time, presence: true
  validates :workout_date, presence: true


  def self.year_to_date_workouts(user)
    workout_scope = self.where(user: user)
    start_date = Date.today.beginning_of_year
    end_date = Date.today
    self.dated_workouts(workout_scope, start_date, end_date)
  end

  def self.current_week_workouts(user)
    workout_scope = self.where(user: user)
    start_date = Date.today.beginning_of_week
    end_date = Date.today.at_end_of_week
    self.dated_workouts(workout_scope, start_date, end_date)
  end

  def self.prior_week_workouts(weeks_back, user)
    workout_scope = self.where(user: user)
    start_date = Date.today.beginning_of_week - (weeks_back * 7)
    end_date = Date.today.at_end_of_week - (weeks_back * 7)
    self.dated_workouts(workout_scope, start_date, end_date)
  end

  def self.calculate_pace(user, start_date, end_date, miles, minutes)
    workout_scope = self.where(user: user)
    self.dated_workouts(workout_scope, start_date, end_date)

    secondsPerMile = (minutes * 60) / miles
    minPace = (secondsPerMile / 60).floor
    secPace = (secondsPerMile % 60).floor

    if secPace == 0
      return "#{minPace}:00"
    elsif secPace < 10
      return "#{minPace}:0#{secPace}"
    else
      return "#{minPace}:#{secPace}"
    end
  end

  def self.all_user_workouts(user)
    self.where(user: user)
  end


  def self.dated_workouts(workout_scope, start_date, end_date)
    workout_scope.where("workout_date >= ? AND workout_date <= ?", start_date, end_date).order(:workout_date)
  end

  def self.add_strava_workouts(strava_workouts, all_workouts_before_strava, current_user)
    workout_id_list = []
    all_workouts_before_strava.each do |workout|
      workout_id_list << workout.id
    end

    strava_workouts_in_system = []
    new_strava_workouts = []
    strava_workouts.each do |workout|
      if workout_id_list.include?(workout['id'])
        strava_workouts_in_system << workout
      else
        new_strava_workouts << workout
      end
    end
    new_strava_workouts.each do |workout|
      Workout.create(id: workout['id'], user_id: current_user.id, distance: (workout['distance'].to_f * 0.000621).round(1), time: (workout['elapsed_time'].to_f / 60), notes: workout['name'], workout_date: workout['start_date_local'])
    end
  end

  def self.validate_ytd_pace(user)
    num_of_workouts_completed = User.find(user.id).workouts.length
    if num_of_workouts_completed > 0
      year_to_date_pace = self.calculate_pace(user, Date.today.beginning_of_year, Date.today, calcuate_total_ytd_miles(user), self.calculate_total_ytd_minutes(user))
    else
      year_to_date_pace = "0"
    end
    return year_to_date_pace
  end

  def self.calculate_sec_per_mile_ytd(user)
    num_of_workouts_completed = User.find(user.id).workouts.length
    if num_of_workouts_completed > 0
      seconds_per_mile_ytd = (self.calculate_total_ytd_minutes(user) * 60) / self.calcuate_total_ytd_miles(user)
    else
      seconds_per_mile_ytd = "0"
    end
    return seconds_per_mile_ytd
  end

  def self.calcuate_total_ytd_miles(user)
    year_to_date_workouts = self.year_to_date_workouts(user)
    miles_to_date = 0

    year_to_date_workouts.each do |workout|
      miles_to_date += workout.distance
    end
    return miles_to_date
  end

  def self.calculate_total_ytd_minutes(user)
    year_to_date_workouts = self.year_to_date_workouts(user)
    minutes_to_date = 0

    year_to_date_workouts.each do |workout|
      minutes_to_date += workout.time
    end
    return minutes_to_date
  end

  def self.calculate_week_to_date_miles(user)
    total_miles_week = 0
    current_week_workouts = self.current_week_workouts(user)

    current_week_workouts.each do |workout|
      total_miles_week += workout.distance
    end
    return total_miles_week
  end

  def self.calculate_week_to_date_minutes(user)
    total_minutes_week = 0
    current_week_workouts = self.current_week_workouts(user)
    current_week_workouts.each do |workout|
      total_minutes_week += workout.time
    end
    return total_minutes_week
  end

  def self.calculate_week_to_date_pace(user)
    if self.current_week_workouts(user).length > 0
      week_to_date_pace = self.calculate_pace(user, Date.today.beginning_of_week, Date.today.at_end_of_week, self.calculate_week_to_date_miles(user), self.calculate_week_to_date_minutes(user))
    else
      week_to_date_pace = '0'
    end
    return week_to_date_pace
  end

  def self.calculate_sec_per_mile_current_week(user)
    if self.current_week_workouts(user).length > 0
      seconds_per_mile_current_week = (self.calculate_week_to_date_minutes(user) * 60) / self.calculate_week_to_date_miles(user)
    else
      seconds_per_mile_current_week = '0'
    end
    return seconds_per_mile_current_week
  end

  def self.calculate_pace_rate_change(user)
    if self.current_week_workouts(user).length > 0
      pace_rate_change = (((self.calculate_sec_per_mile_current_week(user) - self.calculate_sec_per_mile_ytd(user))/self.calculate_sec_per_mile_ytd(user)) * 100).round(1)
    else
      pace_rate_change = '0'
    end
    return pace_rate_change
  end

  def self.calculate_days_run_in_row(user)
    date_from = Date.today.beginning_of_year
    date_to = Date.today
    year_to_date_workouts = self.year_to_date_workouts(user)
    all_dates_year_to_date = Array(date_from..date_to)

    date_of_workouts_year_to_date = []
    year_to_date_workouts.each do |workout|
      date_of_workouts_year_to_date << workout.workout_date
    end

    missing_dates = all_dates_year_to_date - date_of_workouts_year_to_date
    last_date_missed = missing_dates.sort!.last
    running_date_streak = (Date.today - last_date_missed).to_i
    return running_date_streak
  end

  def self.week_dropdown(user)
    week_start = Date.today.beginning_of_week
    week_end = Date.today.at_end_of_week
    current_week_all_dates = Array(week_start..week_end)
    user_current_week_workouts_dates = []
    current_week_workouts = self.current_week_workouts(user)

    current_week_workouts.each do |workout|
      user_current_week_workouts_dates << workout.workout_date
    end

    week_dropdown = current_week_all_dates - user_current_week_workouts_dates
    return week_dropdown
  end

end
