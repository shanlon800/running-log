require 'rails_helper'

RSpec.describe Goal, type: :model do
  it { should have_valid(:team_goal).when("30") }
  it { should_not have_valid(:team_goal).when(nil,"") }

  it { should belong_to :team }

end
