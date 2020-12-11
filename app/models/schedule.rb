class Schedule < ApplicationRecord
  belongs_to :manifest

  validates :time_entry, length: { is: 12 }
end
