import React, { FC } from 'react';
import EntryForm from '../form';
import EntriesNavigation from '../navigation';

import './index.sass';

interface NewEntryProps {
  history: {
    push: (path: string) => void;
  };
}

export let NewEntry: FC<NewEntryProps> = ({ history: { push } }) => {
  return (
    <main className="new-entry__main-wrapper">
      <EntriesNavigation view="new" />

      <EntryForm push={push} />
    </main>
  );
};

export default NewEntry;
