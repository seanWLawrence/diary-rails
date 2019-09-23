module Mutations
  class UpsertEntry < Mutations::BaseMutation
    argument :id, ID, required: false
    argument :gratitudes, [String], required: true
    argument :goals, [String], required: true
    argument :affirmations, [String], required: true
    argument :positive_experiences, [String], required: false
    argument :improvements, [String], required: false

    field :success, Boolean, null: false
    field :errors, [String], null: true
    field :entry, Types::Entry, null: true

    def resolve(
      id: nil,
      gratitudes:,
      goals:,
      affirmations: [],
      positive_experiences: [],
      improvements: []
    )
      params = {
        gratitudes: gratitudes,
        goals: goals,
        affirmations: affirmations,
        positive_experiences: positive_experiences,
        improvements: improvements
      }

      if id
        entry = Entry.find_by id: id

        entry&.update params
      else
        entry = Entry.new params
      end

      if entry && entry&.save
        {
          success: true,
          entry: entry,
          errors: nil
        }
      else
        {
          success: false,
          entry: nil,
          errors: entry&.errors&.full_messages
        }
      end
    end
  end
end
