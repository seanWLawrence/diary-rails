import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import EntryForm from './form';

import './new.sass';

interface NewEntryProps {
  history: {
    push: (path: string) => void;
  };
}

export let NewEntry: FC<NewEntryProps> = ({ history: { push } }) => {
  return (
    <main className="new-entry__main-wrapper">
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

      <EntryForm push={push} />
    </main>
  );
};

export default NewEntry;
