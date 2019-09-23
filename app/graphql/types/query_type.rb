module Types
  class QueryType < Types::BaseObject
    field :entries, [Types::Entry], null: false
    def entries
      ::Entry.all.order(id: :asc)
    end

    field :entry, Types::Entry, null: true do
      argument :id, ID, required: true
    end

    def entry(id:)
      ::Entry.find_by id: id
    end
  end
end
