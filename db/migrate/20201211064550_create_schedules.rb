class CreateSchedules < ActiveRecord::Migration[6.0]
  def change
    create_table :schedules do |t|
      t.time :day_starts_at
      t.jsonb :time_entry, null: false, default: []
      t.references :manifest, null: false, index: true, foreign_key: { on_delete: :cascade }

      t.timestamps
    end
  end
end
