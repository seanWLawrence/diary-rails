import { gql } from 'apollo-boost';

import {
  UpsertEntryMutation,
  UpsertEntryMutationVariables
} from './__generated__/UpsertEntryMutation';

export { UpsertEntryMutation, UpsertEntryMutationVariables };

export default gql`
  mutation UpsertEntryMutation(
    $gratitudes: [String!]!
    $goals: [String!]!
    $affirmations: [String!]!
    $positiveExperiences: [String!]
    $improvements: [String!]
  ) {
    upsertEntry(
      gratitudes: $gratitudes
      goals: $goals
      affirmations: $affirmations
      positiveExperiences: $positiveExperiences
      improvements: $improvements
    ) {
      errors
      success
    }
  }
`;
