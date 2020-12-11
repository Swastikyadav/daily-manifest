class ChangeTaskColumnType < ActiveRecord::Migration[6.0]
  def change
    remove_column :microtasks, :task
    add_column :microtasks, :task, :jsonb, default: []
  end
end
