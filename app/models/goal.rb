class Goal < ApplicationRecord
  belongs_to :team

  validates :team_goal, numericality: { :greater_than_or_equal_to => 0}
end
