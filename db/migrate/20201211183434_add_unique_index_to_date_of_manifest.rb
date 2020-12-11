class AddUniqueIndexToDateOfManifest < ActiveRecord::Migration[6.0]
  def change
    add_index :manifests, :date_of_manifest, unique: true
  end
end
