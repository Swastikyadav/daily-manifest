class Manifest < ApplicationRecord
  belongs_to :user
  has_one :reading, :dependent => :destroy

  validates :day, presence: true
  validates :date_of_manifest, presence: true
end
