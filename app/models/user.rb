class User < ApplicationRecord
  has_many :workouts
  has_many :memberships
  has_many :teams,
    through: :memberships
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
