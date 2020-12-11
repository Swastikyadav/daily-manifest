class Microtask < ApplicationRecord
  belongs_to :manifest

  validates :task, presence: true
  validates_with SingleRecordValidator, on: :create, name: "microtasks"
end
