class Team < ApplicationRecord
  has_many :memberships
  has_many :users,
    through: :memberships
  # belongs_to :coach, class_name: 'User'

  validates :team_name, presence: true
end
