class Schedule < ApplicationRecord
  belongs_to :manifest

  validates :time_entry, length: { is: 13 }
  validates_with SingleRecordValidator, on: :create, name: "schedule"
end
