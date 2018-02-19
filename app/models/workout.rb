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
end
