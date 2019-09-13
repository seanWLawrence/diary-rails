module Types
  class MutationType < Types::BaseObject
    field :create_entry, mutation: Mutations::CreateEntry
  end
end
