module Types
  class BaseObject < GraphQL::Schema::Object
    field :id, ID, null: false
    def id
      object.id
    end
  end
end
