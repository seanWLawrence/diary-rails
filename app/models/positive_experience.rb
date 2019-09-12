# frozen_string_literal: true

class PositiveExperience < ApplicationRecord
  belongs_to :entry

  validates :body, presence: true
end
