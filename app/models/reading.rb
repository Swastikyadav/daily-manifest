class Reading < ApplicationRecord
  belongs_to :manifest

  validates_with SingleRecordValidator, on: :create, name: "reading"
end
