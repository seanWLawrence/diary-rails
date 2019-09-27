import { gql } from 'apollo-boost';

import { EntriesQuery } from './__generated__/EntriesQuery';

export { EntriesQuery };

export default gql`
  query EntriesQuery {
    entries {
      id
      dateCreated
      gratitudes
      goals
      affirmations
      positiveExperiences
      improvements
      thingsLearned
    }
  }
`;
