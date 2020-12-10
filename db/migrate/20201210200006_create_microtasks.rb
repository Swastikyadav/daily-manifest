class CreateMicrotasks < ActiveRecord::Migration[6.0]
  def change
    create_table :microtasks do |t|
      t.string :task, null: false
      t.references :manifest, null: false, index: true, foreign_key: { on_delete: :cascade }

      t.timestamps
    end
  end
end
