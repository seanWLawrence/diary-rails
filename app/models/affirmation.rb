# frozen_string_literal: true

class Affirmation < ApplicationRecord
  belongs_to :entry

  validates :body, presence: true
end
