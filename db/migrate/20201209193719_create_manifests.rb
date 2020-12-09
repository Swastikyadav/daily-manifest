class CreateManifests < ActiveRecord::Migration[6.0]
  def change
    create_table :manifests do |t|
      t.integer :day
      t.date :date_of_manifest
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
