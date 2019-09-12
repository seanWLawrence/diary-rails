module Types
  class Entry < Types::BaseObject
    field :gratitudes, [String], null: false
    field :goals, [String], null: false
    field :affirmation, String, null: false
    field :positive_experiences, [String], null: false
    field :improvements, [String], null: false
  end
end
