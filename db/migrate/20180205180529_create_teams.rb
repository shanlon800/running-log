class CreateTeams < ActiveRecord::Migration[5.1]
  def change
    create_table :teams do |t|
      t.string :team_name, null: false

      t.timestamps null: false
    end
  end
end
