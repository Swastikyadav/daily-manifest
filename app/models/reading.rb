class Reading < ApplicationRecord
  belongs_to :manifest

  validates :read, presence: true
  validates_with SingleRecordValidator, on: :create, name: "readings"
end
