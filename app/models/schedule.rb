class Schedule < ApplicationRecord
  belongs_to :manifest

  validates :time_entry, length: { is: 12 }
  validates_with SingleRecordValidator, on: :create, name: "schedules"
end
