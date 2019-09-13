# frozen_string_literal: true

class Entry < ApplicationRecord
  has_many :gratitudes
  has_many :goals
  has_many :improvements
  has_many :positive_experiences

  has_one :affirmation

  validates_associated :gratitudes, :goals, :affirmation,
                       :positive_experiences, :improvements
  validates :gratitudes, :goals, :affirmation, presence: true
end
