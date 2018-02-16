class User < ApplicationRecord
  mount_uploader :profile_photo, ProfilePhotoUploader

  has_many :workouts
  has_many :memberships
  has_many :teams,
    through: :memberships
  # has_many :teams, foreign_key: :coach_id

  validates :first_name, presence: true
  validates :last_name, presence: true

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :omniauthable, :omniauth_providers => [:facebook]
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  def self.from_omniauth(auth)
   where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
     user.email = auth.info.email
     user.password = Devise.friendly_token[0,20]
     user_array = auth.info.name.split(' ')
     user.first_name= user_array[0]
     user.last_name = user_array[1]
     user.profile_photo = auth.info.image.gsub('http://', 'https://')
    end
  end
end
