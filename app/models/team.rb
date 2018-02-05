class Team < ApplicationRecord
  has_many :memberships
  has_many :users,
    through: :memberships

  validates :team_name, presence: true
end
