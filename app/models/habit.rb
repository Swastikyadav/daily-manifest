class Habit < ApplicationRecord
  belongs_to :manifest

  validates :good_habits, length: { is: 3 }
  validates :bad_habits, length: { is: 3 }
end
