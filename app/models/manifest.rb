class Manifest < ApplicationRecord
  belongs_to :user
  has_many :readings
  has_many :reflections
  has_many :microtasks

  validates :day, presence: true
  validates :date_of_manifest, presence: true
end
