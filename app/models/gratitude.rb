# frozen_string_literal: true

class Gratitude < ApplicationRecord
  belongs_to :entry

  validates :body, presence: true
end
