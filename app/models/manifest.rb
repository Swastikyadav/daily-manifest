class Manifest < ApplicationRecord
  belongs_to :user
  has_one :reading
  has_one :reflection
  has_one :microtask
  has_one :goal
  has_one :habit
  has_one :schedule

  accepts_nested_attributes_for :reading, update_only: true
  accepts_nested_attributes_for :reflection, update_only: true
  accepts_nested_attributes_for :microtask, update_only: true
  accepts_nested_attributes_for :goal, update_only: true
  accepts_nested_attributes_for :habit, update_only: true

  validates :day, presence: true
  validates :date_of_manifest, presence: true, uniqueness: true
end
