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
