class Manifest < ApplicationRecord
  belongs_to :user
  has_many :readings
  has_many :reflections
  has_many :microtasks
  has_many :goals
  has_many :habits
  has_many :schedules

  validates :day, presence: true
  validates :date_of_manifest, presence: true
end
