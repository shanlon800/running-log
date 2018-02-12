require 'rails_helper'
include Warden::Test::Helpers

RSpec.describe Api::V1::MembershipsController, type: :controller do
  let!(:user_one) {User.create!(first_name: "John", last_name: "Smith", email: "jsmith1@aol.com", password: 'password1')}
  let!(:user_two) {User.create!(first_name: "Jane", last_name: "Smith", email: "jsmith2@aol.com", password: 'password2')}
  let!(:workout_one) {Workout.create!(user_id: user_one.id, distance: 5, time: '35', notes: "felt pretty good today", workout_date: "Feb 1 2018")}
  let!(:workout_two) {Workout.create!(user_id: user_one.id, distance: 3.5, time: "22", notes: "felt really fast today", workout_date: "Feb 2 2018")}
  let!(:workout_three) {Workout.create!(user_id: user_one.id, distance: 2, time: "18", notes: "felt really tired today", workout_date: "Feb 3 2018")}
  let!(:team_one) {Team.create!(team_name: 'Boston Running Club')}
  let!(:membership_one) {Membership.create(user_id: user_one.id, team_id: team_one.id)}

  describe "Post#create" do
    it 'creates a new membership' do
      sign_in(user_two, :scope => :user)

      post_json = {membership:{user_id: user_two.id, team_id: team_one.id}}
      memberships = Membership.where(user_id: user_two.id)
      prev_count = memberships.count
      post(:create, params: post_json)
      expect(Membership.where(user_id: user_two.id).count).to eq(prev_count + 1)
    end

    it 'will not create if not signed in and give an error' do
      expect{ get :create }.to raise_error(ActionController::RoutingError)

    end
  end



end
