class UpdateTeamsCoaches < ActiveRecord::Migration[5.1]
  def change
    add_column :teams, :coach_id, :integer
  end
end
