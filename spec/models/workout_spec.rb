require 'rails_helper'

RSpec.describe Workout, type: :model do
  it { should have_valid(:run_type).when("Run") }
  it { should have_valid(:distance).when(5) }
  it { should have_valid(:time).when("57") }
  it { should have_valid(:workout_date).when("Jan 1 2018") }
  it { should have_valid(:notes).when("Today was a tough run")}

  it { should_not have_valid(:distance).when(nil,"") }
  it { should_not have_valid(:time).when(nil,"") }
  it { should_not have_valid(:workout_date).when(nil,"") }

  it { should_not have_valid(:distance).when(-1) }

  it { should belong_to :user }
end
