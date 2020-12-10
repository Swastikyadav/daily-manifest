class Reading < ApplicationRecord
  belongs_to :manifest

  validates :read, presence: true
end
