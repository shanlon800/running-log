require 'rails_helper'
include Warden::Test::Helpers

RSpec.describe Api::V1::TeamsController, type: :controller do
  let!(:user_one) {User.create!(first_name: "John", last_name: "Smith", email: "jsmith1@aol.com", password: 'password1')}
  let!(:user_two) {User.create!(first_name: "Jane", last_name: "Smith", email: "jsmith2@aol.com", password: 'password2')}
  let!(:user_three) {User.create!(first_name: "Sally", last_name: "Fields", email: "sfields@aol.com", password: 'password3')}
  let!(:workout_one) {Workout.create!(user_id: user_one.id, distance: 5, time: '35', notes: "felt pretty good today", workout_date: Date.today)}
  let!(:workout_two) {Workout.create!(user_id: user_two.id, distance: 3.5, time: "22", notes: "felt really fast today", workout_date: Date.today)}
  let!(:workout_three) {Workout.create!(user_id: user_three.id, distance: 2, time: "18", notes: "felt really tired today", workout_date: Date.today)}
  let!(:team_one) {Team.create!(team_name: 'Boston Running Club')}
  let!(:membership_one) {Membership.create!(user_id: user_one.id, team_id: team_one.id)}
  let!(:membership_two) {Membership.create!(user_id: user_two.id, team_id: team_one.id)}
  let!(:membership_three) {Membership.create!(user_id: user_three.id, team_id: team_one.id)}
  let!(:goal_one) {Goal.create!(team_id: team_one.id, team_goal: 40)}
  describe 'GET#show' do
    it 'should return the team information and a list of users with their workouts' do
      sign_in(user_one, :scope => :user)
      get :show, params: {id: team_one.id}

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')
      expect(returned_json.length).to eq 3

      expect(returned_json['team']['team_name']).to eq team_one.team_name

      expect(returned_json['users'][0]['user']['email']).to eq user_one.email
      expect(returned_json['users'][0]['user']['first_name']).to eq user_one.first_name
      expect(returned_json['users'][0]['user']['last_name']).to eq user_one.last_name
      expect(returned_json['users'][0]['workouts'][0]['distance']).to eq workout_one.distance
      expect(returned_json['users'][0]['workouts'][0]['time']).to eq workout_one.time

      expect(returned_json['users'][1]['user']['email']).to eq user_two.email
      expect(returned_json['users'][1]['user']['first_name']).to eq user_two.first_name
      expect(returned_json['users'][1]['user']['last_name']).to eq user_two.last_name
      expect(returned_json['users'][1]['workouts'][0]['distance']).to eq workout_two.distance
      expect(returned_json['users'][1]['workouts'][0]['time']).to eq workout_two.time

      expect(returned_json['users'][2]['user']['email']).to eq user_three.email
      expect(returned_json['users'][2]['user']['first_name']).to eq user_three.first_name
      expect(returned_json['users'][2]['user']['last_name']).to eq user_three.last_name
      expect(returned_json['users'][2]['workouts'][0]['distance']).to eq workout_three.distance
      expect(returned_json['users'][2]['workouts'][0]['time']).to eq workout_three.time
      expect(returned_json['goal']).to eq goal_one.team_goal
    end
  end

  describe "GET#index" do
    it 'if no user is signed out, it should return an error message' do
      expect{ get :show, params: {id: team_one.id} }.to raise_error(ActionController::RoutingError)
    end
  end
end
