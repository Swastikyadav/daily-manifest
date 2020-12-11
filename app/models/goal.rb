class Goal < ApplicationRecord
  belongs_to :manifest

  validates :macro, length: { is: 3 }
  validates :meezo, length: { is: 3 }
  validates_with SingleRecordValidator, on: :create, name: "goal"
end
