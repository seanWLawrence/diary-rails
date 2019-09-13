module Types
  class MutationType < Types::BaseObject
    field :upsert_entry, mutation: Mutations::UpsertEntry
  end
end
