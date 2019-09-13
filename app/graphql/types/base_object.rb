module Types
  class BaseObject < GraphQL::Schema::Object
    field :id, ID, null: false
    field :date_created, ID, null: false
    field :date_updated, ID, null: false

    def date_created
      prettify_date(object.created_at)
    end

    def date_updated
      prettify_date(object.updated_at)
    end

    private

    def prettify_date(date)
      date.to_formatted_s(:long).slice(0...-12)
    end
  end
end
