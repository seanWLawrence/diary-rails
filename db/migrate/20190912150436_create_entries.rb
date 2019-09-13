class CreateEntries < ActiveRecord::Migration[6.0]
  def change
    create_table :entries do |t|
      t.string :gratitudes, array: true, default: []
      t.string :goals, array: true, default: []
      t.string :affirmations, array: true, default: []
      t.string :improvements, array: true, default: []
      t.string :positive_experiences, array: true, default: []

      t.timestamps
    end
  end
end
