import React, { FC } from 'react';
import EntryForm from '../components/form';
import EntriesNavigation from '../components/navigation';
import EntriesWrapper from '../components/wrapper';

interface NewEntryProps {
  history: {
    push: (path: string) => void;
  };
}

let NewEntry: FC<NewEntryProps> = ({ history: { push } }) => {
  return (
    <EntriesWrapper>
      <EntriesNavigation view="new" />

      <EntryForm push={push} />
    </EntriesWrapper>
  );
};

export default NewEntry;
