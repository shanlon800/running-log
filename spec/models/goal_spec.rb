require 'rails_helper'

RSpec.describe Goal, type: :model do
  it { should have_valid(:team_goal).when("30") }
  it { should have_valid(:team_goal).when(nil, "0") }

  it { should belong_to :team }

end
