import React, { FC } from 'react';
import EntryForm from '../form';
import EntriesNavigation from '../navigation';
import EntriesWrapper from '../wrapper';

interface NewEntryProps {
  history: {
    push: (path: string) => void;
  };
}

export let NewEntry: FC<NewEntryProps> = ({ history: { push } }) => {
  return (
    <EntriesWrapper>
      <EntriesNavigation view="new" />

      <EntryForm push={push} />
    </EntriesWrapper>
  );
};

export default NewEntry;
