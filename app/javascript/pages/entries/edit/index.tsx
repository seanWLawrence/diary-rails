import { useQuery } from '@apollo/react-hooks';
import React, { FC } from 'react';
import EntryForm from '../form';
import EntriesNavigation from '../navigation';
import ENTRY_QUERY, { EntryQuery } from './entry.graphql';

import './index.sass';

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

export let EditEntry: FC<EditEntryProps> = ({
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
    <main className="edit-entry__main-wrapper">
      <EntriesNavigation view="edit" />

      <EntryForm push={push} entry={entry} />
    </main>
  );
};

export default EditEntry;
