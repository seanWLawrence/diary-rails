import { useQuery } from '@apollo/react-hooks';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import ENTRY_QUERY, { EntryQuery } from './entry.graphql';
import EntryForm from './form';

import './edit.sass';

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
      <Link to="/entries" className="entries__logo">
        <h1>Diario de 5 minutos</h1>
      </Link>

      <nav className="entries__nav">
        <Link to="/entries/" className="entries__nav-anchor">
          todo entradas
        </Link>

        <a href="/logout" className="entries__nav-anchor">
          logout
        </a>
      </nav>

      <EntryForm push={push} entry={entry} />
    </main>
  );
};

export default EditEntry;
