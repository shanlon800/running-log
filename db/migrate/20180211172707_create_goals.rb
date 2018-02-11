class CreateGoals < ActiveRecord::Migration[5.1]
  def change
    create_table :goals do |t|
      t.integer :team_goal, default: 0
      t.belongs_to :team

      t.timestamps
    end
  end
end
