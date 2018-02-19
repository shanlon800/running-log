class Api::V1::WorkoutsController < ApplicationController
  before_action :authorize_user
  skip_before_action :verify_authenticity_token, only: [:create, :update, :destroy]


  def create
    workout = Workout.new(workout_params)
    if workout.save
      @current_week_start = Date.today.beginning_of_week
      @current_week_end = Date.today.at_end_of_week
      current_week_all_users = calculateWeek(0).order(:workout_date)
      current_week_all_dates = Array(@current_week_start..@current_week_end)

      workouts_selected = Workout.current_week_workouts(current_user)

      user_current_week_workouts_dates = []

      workouts_selected.each do |workout|
        user_current_week_workouts_dates << workout.workout_date
      end

      week_dropdown = current_week_all_dates - user_current_week_workouts_dates

      render json: {workouts: workouts_selected, week_dropdown: week_dropdown}
    else
      render json: { error: review.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    workout = Workout.find(params[:id])
    workout.update_attributes(workout_params)
    if workout.save
      @current_week_start = Date.today.beginning_of_week
      @current_week_end = Date.today.at_end_of_week
      current_week_all_dates = Array(@current_week_start..@current_week_end)

      workouts_selected = Workout.current_week_workouts(current_user)
      user_current_week_workouts_dates = []

      workouts_selected.each do |workout|
        user_current_week_workouts_dates << workout.workout_date
      end

      week_dropdown = current_week_all_dates - user_current_week_workouts_dates

      render json: {workouts: workouts_selected, week_dropdown: week_dropdown}
    else
      render json: { error: review.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @current_week_start = Date.today.beginning_of_week
    @current_week_end = Date.today.at_end_of_week
    @current_week = calculateWeek(0).order(:workout_date)
    current_week_all_dates = Array(@current_week_start..@current_week_end)

    workout = Workout.find(params[:id])
    if current_user.id == workout.user_id
      if workout.destroy
        current_week_all_users = calculateWeek(0).order(:workout_date)

        workouts_selected = Workout.current_week_workouts(current_user)
        user_current_week_workouts_dates = []

        workouts_selected.each do |workout|
          user_current_week_workouts_dates << workout.workout_date
        end

        week_dropdown = current_week_all_dates - user_current_week_workouts_dates
        render json: {workouts:workouts_selected, week_dropdown: week_dropdown}
      else
        render errors
      end
    else
      render json: { errors: "Access Denied" }, status: 401
    end
  end

  private

  def workout_params
    params.require(:workout).permit(
      :user_id,
      :distance,
      :notes,
      :time,
      :workout_date
    )
  end
  def authorize_user
    if !user_signed_in?
      raise ActionController::RoutingError.new("Not Found")
    end
  end
end
