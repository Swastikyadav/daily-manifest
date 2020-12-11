class CreateGoals < ActiveRecord::Migration[6.0]
  def change
    create_table :goals do |t|
      t.jsonb :macro, null: false, default: []
      t.jsonb :meezo, null: false, default: []
      t.references :manifest, null: false, index: true, foreign_key: { on_delete: :cascade }

      t.timestamps
    end
  end
end
