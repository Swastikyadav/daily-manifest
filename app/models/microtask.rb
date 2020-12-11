class Microtask < ApplicationRecord
  belongs_to :manifest

  validates :task, length: { is: 3 }
  validates_with SingleRecordValidator, on: :create, name: "microtask"
end
