import { useQuery } from '@apollo/react-hooks';
import React, { FC } from 'react';
import EntryForm from '../components/form';
import EntriesNavigation from '../components/navigation';
import EntriesWrapper from '../components/wrapper';
import ENTRY_QUERY, { EntryQuery } from './entry.graphql';

interface EditEntryProps {
  history: {
    push: (path: string) => void;
  };
  match: {
    params: {
      id: string;
    };
  };
}

let EditEntry: FC<EditEntryProps> = ({
  history: { push },
  match: {
    params: { id },
  },
}) => {
  let { loading, error, data } = useQuery<EntryQuery>(ENTRY_QUERY, {
    variables: { id },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error!</p>;
  }

  let { entry } = data;

  return (
    <EntriesWrapper>
      <EntriesNavigation view="edit" />

      <EntryForm push={push} entry={entry} />
    </EntriesWrapper>
  );
};

export default EditEntry;
