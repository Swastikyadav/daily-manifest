class Manifest < ApplicationRecord
  belongs_to :user
  has_many :reading

  validates :day, presence: true
  validates :date_of_manifest, presence: true
end
