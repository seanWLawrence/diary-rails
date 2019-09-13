# frozen_string_literal: true

class Entry < ApplicationRecord
  validates :gratitudes, :goals, :affirmations, presence: true
end
