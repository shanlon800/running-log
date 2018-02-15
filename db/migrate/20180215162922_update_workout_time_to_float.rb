class UpdateWorkoutTimeToFloat < ActiveRecord::Migration[5.1]
  def up
    change_column(:workouts, :distance, :float, null: false)
  end

  def down
    change_column(:workouts, :distance, :integer, null: false)
  end
end
