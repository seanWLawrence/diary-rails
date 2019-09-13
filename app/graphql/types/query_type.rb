module Types
  class QueryType < Types::BaseObject
    field :entries, [Types::Entry], null: false
    def entries
      ::Entry.all.order(id: :asc)
    end
  end
end
