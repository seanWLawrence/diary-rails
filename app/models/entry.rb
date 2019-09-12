# frozen_string_literal: true

class Entry < ApplicationRecord
  has_many :gratitudes
  has_many :goals
  has_many :improvements
  has_many :positive_experiences
  has_one :affirmation
end
