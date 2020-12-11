class Goal < ApplicationRecord
  belongs_to :manifest

  validates :macro, length: { is: 3 }
  validates :meezo, length: { is: 3 }
end
