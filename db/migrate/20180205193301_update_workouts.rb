class UpdateWorkouts < ActiveRecord::Migration[5.1]
  def change
    add_column :workouts, :workout_date, :date, null: false
  end
end
