class Manifest < ApplicationRecord
  belongs_to :user
  has_many :readings
  has_many :reflections

  validates :day, presence: true
  validates :date_of_manifest, presence: true
end
