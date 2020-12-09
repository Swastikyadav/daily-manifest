class AddOnCascadeDelete < ActiveRecord::Migration[6.0]
  def change
    remove_foreign_key :manifests, :users
    add_foreign_key :manifests, :users, on_delete: :cascade
  end
end
