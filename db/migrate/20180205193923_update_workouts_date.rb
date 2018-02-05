class UpdateWorkoutsDate < ActiveRecord::Migration[5.1]
  def up
    remove_column :workouts, :date
  end

  def down
    add_column :workouts, :date, :string
  end
end
