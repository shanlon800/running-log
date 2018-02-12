class Api::V1::MembershipsController < ApplicationController
  # skip_before_action :verify_authenticity_token, only: [:create]
  before_action :authorize_user

  def create
    membership = Membership.new(membership_params)
    if membership.save
      user = User.find(membership.user_id)
      render json: user.teams
    else
      render json: { error: membership.errors.full_messages }, status: :unprocessable_entity
     end
  end

  private

  def membership_params
    params.require(:membership).permit(
      :team_id,
      :user_id
    )
  end

  def authorize_user
    if !user_signed_in?
      raise ActionController::RoutingError.new("Not Found")
    end
  end

end
