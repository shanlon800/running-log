class CreateWorkouts < ActiveRecord::Migration[5.1]
  def change
    create_table :workouts do |t|
      t.belongs_to :user, null: false
      t.string :run_type, null: false, default: "Run"
      t.integer :distance, null: false
      t.string :time, null: false
      t.text :notes
      t.string :date, null: false

      t.timestamps null: false
    end
  end
end
