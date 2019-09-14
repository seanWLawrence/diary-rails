FactoryBot.define do
  factory :entry do
    gratitudes { ['some gratitude', 'some other gratitude'] }
    goals { ['some goal', 'some other goal'] }
    affirmations { ['some affirmation', 'some other affirmation'] }
    positive_experiences { ['some positive_experience', 'some other positive_experience'] }
    improvements { ['some improvement', 'some other improvement'] }

    trait :random_created_at do
      created_at { Time.at(rand * Time.now.to_i) }
    end
  end
end
