require 'rails_helper'

RSpec.describe Team, type: :model do
  it { should have_valid(:team_name).when("Boston Running Club") }

  it { should_not have_valid(:team_name).when(nil,"") }

end
