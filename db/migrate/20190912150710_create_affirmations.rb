# frozen_string_literal: true

class CreateAffirmations < ActiveRecord::Migration[6.0]
  def change
    create_table :affirmations do |t|
      t.text :body, null: false
      t.references :entry, null: false, foreign_key: true

      t.timestamps
    end
  end
end
