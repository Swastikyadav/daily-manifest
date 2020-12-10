class CreateReadings < ActiveRecord::Migration[6.0]
  def change
    create_table :readings do |t|
      t.string :read, null: false, default: ""
      t.references :manifest, null: false, index: true, foreign_key: true

      t.timestamps
    end
  end
end
