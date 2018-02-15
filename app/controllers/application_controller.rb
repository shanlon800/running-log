class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?

  def calculateWeek(weeksBack)
    Workout.where("workout_date >= ? AND workout_date <= ?", (@current_week_start - (weeksBack * 7)), (@current_week_end - (weeksBack * 7)))
  end
  
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def configure_permitted_parameters
  devise_parameter_sanitizer.permit(:sign_up) {|u| u.permit(
        :first_name,
      :last_name,
      :email,
      :password,
      :password_confirmation,
      :remember_me,
      :profile_photo
    )
  }
  # devise_parameter_sanitizer.permit(:account_update) { |u| u.permit(:username, :email, :password,
  #   :password_confirmation, :current_password, :avatar, :avatar_cache, :remove_avatar) }
  end
end
