class CreateReflections < ActiveRecord::Migration[6.0]
  def change
    create_table :reflections do |t|
      t.jsonb :reflection, null: false, default: []
      t.references :manifest, null: false, index: true, foreign_key: { on_delete: :cascade }

      t.timestamps
    end
  end
end
