class ChangeWorkoutTime < ActiveRecord::Migration[5.1]
  def up
    remove_column :workouts, :time
  end

  def down
    add_column :workouts, :time, :string, null: false
  end
end
