module Mutations
  class CreateEntry < Mutations::BaseMutation
    argument :gratitudes, [String], required: true
    argument :goals, [String], required: true
    argument :affirmation, String, required: true
    argument :positive_experiences, [String], required: false
    argument :improvements, [String], required: false

    field :success, Boolean, null: false
    field :errors, [String], null: true
    field :entry, Types::Entry, null: true

    def resolve(
      gratitudes:,
      goals:,
      affirmation:,
      positive_experiences:,
      improvements:
    )
      entry = Entry.new

      # Required
      entry.gratitudes.build(gratitudes.map { |body| { body: body } })
      entry.goals.build(goals.map { |body| { body: body } })
      entry.build_affirmation body: affirmation

      # Not required
      entry.positive_experiences.build(positive_experiences.map { |body| { body: body } })
      entry.improvements.build(improvements.map { |body| { body: body } })

      if entry.save
        {
          success: true,
          entry: entry,
          errors: nil
        }
      else
        {
          success: false,
          entry: nil,
          errors: entry.errors.full_messages
        }
      end
    end
  end
end
