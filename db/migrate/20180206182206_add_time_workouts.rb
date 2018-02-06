class AddTimeWorkouts < ActiveRecord::Migration[5.1]
  def change
    add_column :workouts, :time, :integer, null: false
  end
end
