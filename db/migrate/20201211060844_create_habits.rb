class CreateHabits < ActiveRecord::Migration[6.0]
  def change
    create_table :habits do |t|
      t.jsonb :good_habits, null: false, default: []
      t.jsonb :bad_habits, null: false, default: []
      t.references :manifest, null: false, index: true, foreign_key: { on_delete: :cascade }

      t.timestamps
    end
  end
end
