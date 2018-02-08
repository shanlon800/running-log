class ApplicationController < ActionController::Base

  def calculateWeek(weeksBack)
    Workout.where("workout_date >= ? AND workout_date <= ?", (@current_week_start - (weeksBack * 7)), (@current_week_end - (weeksBack * 7)))
  end

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
end
