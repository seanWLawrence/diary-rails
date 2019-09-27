module Types
  class Entry < Types::BaseType
    field :gratitudes, [String], null: false
    field :goals, [String], null: false
    field :affirmations, [String], null: false
    field :positive_experiences, [String], null: false
    field :improvements, [String], null: false
    field :things_learned, [String], null: false
  end
end
