class Reflection < ApplicationRecord
  belongs_to :manifest

  validates :reflection, length: { is: 3 }
end
