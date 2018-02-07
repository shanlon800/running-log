require 'rails_helper'
include Warden::Test::Helpers

RSpec.describe Api::V1::WorkoutsController, type: :controller do
  let!(:user_one) {User.create!(first_name: "John", last_name: "Smith", email: "jsmith1@aol.com", password: 'password1')}
  let!(:user_two) {User.create!(first_name: "Jane", last_name: "Smith", email: "jsmith2@aol.com", password: 'password2')}
  let!(:workout_one) {Workout.create!(user_id: user_one.id, distance: 5, time: '35', notes: "felt pretty good today", workout_date: "Feb 1 2018")}
  let!(:workout_two) {Workout.create!(user_id: user_one.id, distance: 3.5, time: "22", notes: "felt really fast today", workout_date: "Feb 2 2018")}
  let!(:workout_three) {Workout.create!(user_id: user_one.id, distance: 2, time: "18", notes: "felt really tired today", workout_date: "Feb 3 2018")}
  let!(:team_one) {Team.create!(team_name: 'Boston Running Club')}
  let!(:membership_one) {Membership.create(user_id: user_one.id, team_id: team_one.id)}
  let!(:membership_two) {Membership.create(user_id: user_two.id, team_id: team_one.id)}

  describe 'GET#index' do
    it 'should return the selected team, the selected user, and the list of their workouts.' do
      sign_in(user_one, :scope => :user)
      get :index, params: { user_id: user_one.id, team_id: team_one.id }

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200

      expect(response.content_type).to eq('application/json')
      expect(returned_json.length).to eq 3
      expect(returned_json['team']['team_name']).to eq team_one.team_name

      expect(returned_json['user']['first_name']).to eq user_one.first_name
      expect(returned_json['user']['last_name']).to eq user_one.last_name

      expect(returned_json['workouts'].length).to eq 3
      expect(returned_json['workouts'][0]['time']).to eq workout_one.time
      expect(returned_json['workouts'][0]['distance']).to eq workout_one.distance

    end
  end
  describe "GET#index" do
    it 'if no user is signed out, it should return an error message' do
      expect{ get :index, params: {user_id: user_one.id, team_id: team_one.id} }.to raise_error(ActionController::RoutingError)
    end
  end

end
