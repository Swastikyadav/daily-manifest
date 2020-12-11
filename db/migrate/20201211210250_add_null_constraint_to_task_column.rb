class AddNullConstraintToTaskColumn < ActiveRecord::Migration[6.0]
  def change
    change_column_null :microtasks, :task, false
  end
end
