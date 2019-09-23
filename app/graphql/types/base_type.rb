module Types
  class BaseType < GraphQL::Schema::Object
    field :id, ID, null: false
    field :date_created, ID, null: false
    field :date_updated, ID, null: false

    def date_created
      object.created_at
    end

    def date_updated
      object.updated_at
    end
  end
end
