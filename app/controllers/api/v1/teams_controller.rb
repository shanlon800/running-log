class Api::V1::TeamsController < ApplicationController
  # skip_before_action :verify_authenticity_token, only: [:destroy]
  def index
    @teams = Team.all
  end

  def show
    @team = Team.find(params[:id])
    @users = @team.users
    render json: {users: @users}
  end

  # def authorize_user
  #   if !user_signed_in?
  #     raise ActionController::RoutingError.new("Not Found")
  #   end
  # end
end
