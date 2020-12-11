class Reflection < ApplicationRecord
  belongs_to :manifest

  validates :reflection, length: { is: 3 }
  validates_with SingleRecordValidator, on: :create, name: "reflection"
end
