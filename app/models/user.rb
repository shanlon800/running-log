class User < ApplicationRecord
  has_many :workouts
  has_many :memberships
  has_many :teams,
    through: :memberships
  # has_many :teams, foreign_key: :coach_id

  validates :first_name, presence: true
  validates :last_name, presence: true

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
