import { gql } from 'apollo-boost';

import { EntryQuery, EntryQuery_entry } from './__generated__/EntryQuery';

export { EntryQuery, EntryQuery_entry };

export default gql`
  query EntryQuery($id: ID!) {
    entry(id: $id) {
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
