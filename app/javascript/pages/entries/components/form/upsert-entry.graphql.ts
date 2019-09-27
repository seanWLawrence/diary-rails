import { gql } from 'apollo-boost';

import {
  UpsertEntryMutation,
  UpsertEntryMutationVariables,
} from './__generated__/UpsertEntryMutation';

export { UpsertEntryMutation, UpsertEntryMutationVariables };

export default gql`
  mutation UpsertEntryMutation(
    $id: ID
    $gratitudes: [String!]!
    $goals: [String!]!
    $affirmations: [String!]!
    $positiveExperiences: [String!]
    $improvements: [String!]
    $thingsLearned: [String!]
  ) {
    upsertEntry(
      id: $id
      gratitudes: $gratitudes
      goals: $goals
      affirmations: $affirmations
      positiveExperiences: $positiveExperiences
      improvements: $improvements
      thingsLearned: $thingsLearned
    ) {
      errors
      success
      entry {
        id
        gratitudes
        goals
        affirmations
        positiveExperiences
        improvements
        thingsLearned
        dateCreated
      }
    }
  }
`;
