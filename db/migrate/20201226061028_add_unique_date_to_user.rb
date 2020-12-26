class AddUniqueDateToUser < ActiveRecord::Migration[6.0]
  def change
    remove_index :manifests, :date_of_manifest
    add_index :manifests, [:date_of_manifest, :user_id], unique: true
  end
end
