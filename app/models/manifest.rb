class Manifest < ApplicationRecord
  belongs_to :user

  validates :day, presence: true
  validates :date_of_manifest, presence: true
end
