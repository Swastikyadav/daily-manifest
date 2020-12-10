class Microtask < ApplicationRecord
  belongs_to :manifest

  validates :task, presence: true
end
