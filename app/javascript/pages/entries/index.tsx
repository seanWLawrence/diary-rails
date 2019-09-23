import { useQuery } from '@apollo/react-hooks';
import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import EditEntry from './edit';
import ENTRIES_QUERY, { EntriesQuery } from './entries.graphql';
import NewEntry from './new';

import './index.sass';

export { NewEntry, EditEntry };

let EntryValue: FC<{ values: string[] }> = ({ values }) => {
  return (
    <>
      {values.map((value: string, index: number) => {
        return (
          <p key={index} className="entries__entry-text">
            {value}
          </p>
        );
      })}
    </>
  );
};

export let Entries: FC = () => {
  let { loading, error, data } = useQuery<EntriesQuery>(ENTRIES_QUERY);
  let [entriesOpen, toggleEntriesOpen] = useState([]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error!</p>;
  }

  let { entries } = data;

  let allEntriesOpen = entriesOpen.length === entries.length;

  return (
    <main className="entries__main-wrapper">
      <Link to="/entries" className="entries__logo">
        <h1>Diario de 5 minutos</h1>
      </Link>

      <nav className="entries__nav">
        <Link to="/entries/new" className="entries__nav-anchor">
          nueva entrada
        </Link>
        <a href="logout" className="entries__nav-anchor">
          logout
        </a>
        {entries.length > 1 && (
          <button
            className="entries__button--toggle-collapse"
            onClick={() =>
              toggleEntriesOpen(allEntriesOpen ? [] : entries.map(e => e.id))
            }
          >
            {allEntriesOpen ? 'Collapse all -' : 'Open all +'}
          </button>
        )}
      </nav>

      {entries.length > 0 &&
        entries.map(
          (
            {
              dateCreated,
              gratitudes,
              goals,
              affirmations,
              positiveExperiences,
              improvements,
              id,
            },
            index,
          ) => {
            let isOpen = entriesOpen.includes(id);

            let isNotLastEntry = entries.length - 1 !== index;

            return (
              <section key={id} className="entries__entry-wrapper">
                <button
                  className="entries__entry-date"
                  onClick={() =>
                    toggleEntriesOpen(
                      isOpen
                        ? entriesOpen.filter(entryId => entryId !== id)
                        : [...entriesOpen, id],
                    )
                  }
                >
                  {dateCreated} {isOpen ? '-' : '+'}
                </button>

                {isOpen && (
                  <div>
                    <Link to={`/entries/${id}/edit`}>Edit</Link>

                    <h2 className="entries__entry-title">
                      Estoy agradecido por...
                    </h2>

                    <EntryValue values={gratitudes} />

                    <h2 className="entries__entry-title">
                      ¿Qué haría grandioso hoy?
                    </h2>

                    <EntryValue values={goals} />

                    <h2 className="entries__entry-title">Estoy...</h2>

                    <EntryValue values={affirmations} />

                    <h2 className="entries__entry-title">
                      Cosas increíbles que sucedieron hoy...
                    </h2>

                    <EntryValue values={positiveExperiences} />

                    <h2 className="entries__entry-title">
                      ¿Cómo podría haber mejorado aún más hoy?
                    </h2>

                    <EntryValue values={improvements} />
                  </div>
                )}

                {allEntriesOpen && isNotLastEntry && (
                  <hr className="entries__entry-divider" />
                )}
              </section>
            );
          },
        )}

      {entries.length === 0 && (
        <div className="entries__main-wrapper--no-entries">
          <p className="entries__entry-text">No entries yet. Create one!</p>
        </div>
      )}
    </main>
  );
};
