class Workout < ApplicationRecord
  belongs_to :user

  validates :run_type, presence: true
  validates :distance, presence: true, numericality: { :greater_than_or_equal_to => 0}
  validates :time, presence: true
  validates :workout_date, presence: true
end
