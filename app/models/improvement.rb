# frozen_string_literal: true

class Improvement < ApplicationRecord
  belongs_to :entry

  validates :body, presence: true
end
