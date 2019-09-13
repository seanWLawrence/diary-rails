module Types
  class Entry < Types::BaseObject
    field :gratitudes, [String], null: false
    field :goals, [String], null: false
    field :affirmation, String, null: false
    field :positive_experiences, [String], null: false
    field :improvements, [String], null: false

    def gratitudes
      object.gratitudes.pluck(:body)
    end

    def goals
      object.goals.pluck(:body)
    end

    def affirmation
      object.affirmation.body
    end

    def positive_experiences
      object.positive_experiences.pluck(:body)
    end

    def improvements
      object.improvements.pluck(:body)
    end
  end
end
