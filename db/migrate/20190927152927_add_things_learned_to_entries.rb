class AddThingsLearnedToEntries < ActiveRecord::Migration[6.0]
  def change
    add_column :entries, :things_learned, :string, array: true, default: []
  end
end
