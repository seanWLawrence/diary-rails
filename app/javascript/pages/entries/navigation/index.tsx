import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { EntriesQuery_entries } from '../__generated__/EntriesQuery';

interface EntriesNavigtaionProps {
  toggleEntriesOpen?: (entryIds: string[]) => void;
  allEntriesOpen?: boolean;
  entries?: EntriesQuery_entries[];
  view: 'new' | 'edit' | 'index';
}

let EntriesNavigation: FC<EntriesNavigtaionProps> = ({
  toggleEntriesOpen,
  allEntriesOpen,
  entries = [],
  view,
}) => {
  let shouldDisplayToggle = entries.length > 1 && view === 'index';

  let shouldDisplayNewEntryButton = view === 'index';

  let shouldDisplayAllEntriesButton = ['new', 'edit'].includes(view);

  return (
    <>
      <Link to="/entries" className="entries__logo">
        <h1>Diario de 5 minutos</h1>
      </Link>

      <nav className="entries__nav">
        {shouldDisplayAllEntriesButton && (
          <Link to="/entries/" className="entries__nav-anchor">
            todo entradas
          </Link>
        )}

        {shouldDisplayNewEntryButton && (
          <Link to="/entries/new" className="entries__nav-anchor">
            nuevo entrada
          </Link>
        )}

        {shouldDisplayToggle && (
          <button
            className="entries__button--toggle-collapse"
            onClick={() =>
              toggleEntriesOpen(allEntriesOpen ? [] : entries.map(e => e.id))
            }
          >
            {allEntriesOpen ? 'close all -' : 'open all +'}
          </button>
        )}

        <a href="/logout" className="entries__nav-anchor">
          logout
        </a>
      </nav>
    </>
  );
};

export default EntriesNavigation;
