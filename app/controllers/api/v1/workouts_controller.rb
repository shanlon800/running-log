class Api::V1::WorkoutsController < ApplicationController
  before_action :authorize_user
  skip_before_action :verify_authenticity_token, only: [:create, :update, :destroy]


  def create
    workout = Workout.new(workout_params)
    if workout.save
      render json: workout
    else
      render json: { error: review.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    workout = Workout.find(params[:id])
    workout.update_attributes(workout_params)
    if workout.save
      render json: workout
    else
      render json: { error: review.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @current_week_start = Date.today.beginning_of_week
    @current_week_end = Date.today.at_end_of_week
    @current_week = calculateWeek(0).order(:workout_date)
    workout = Workout.find(params[:id])
    if current_user.id == workout.user_id
      if workout.destroy
        current_week_all_users = calculateWeek(0).order(:workout_date)

        workouts_selected = []
        current_week_all_users.each do |workout|
          if workout.user_id == @current_user.id
            workouts_selected << workout
          end
        end
        updated_workouts = workouts_selected
        render json: updated_workouts
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
