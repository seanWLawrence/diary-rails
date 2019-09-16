import { useQuery } from '@apollo/react-hooks';
import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import ENTRIES_QUERY, { EntriesQuery } from './entries.graphql';
import './index.css';
import NewEntry from './new';

export { NewEntry };

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
    <main className="main__wrapper">
      <Link to="/entries" className="title__anchor">
        <h1 className="title">Diario de 5 minutos</h1>
      </Link>

      <nav className="nav">
        <Link to="/entries/new" className="nav__anchor">
          nueva entrada
        </Link>
        {entries.length > 1 && (
          <button
            className="entries__toggle-collpase-button"
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
          ({
            dateCreated,
            gratitudes,
            goals,
            affirmations,
            positiveExperiences,
            improvements,
            id,
          }) => {
            let isOpen = entriesOpen.includes(id);

            return (
              <section key={id} className="entry__wrapper">
                <button
                  className="entry__date"
                  onClick={() =>
                    toggleEntriesOpen(
                      isOpen
                        ? entriesOpen.filter(entryId => entryId !== id)
                        : [...entriesOpen, id]
                    )
                  }
                >
                  {dateCreated} {isOpen ? '-' : '+'}
                </button>

                {isOpen && (
                  <div>
                    <h2 className="entry__title">Estoy agradecido por...</h2>
                    {gratitudes.map((gratitude: string, index: number) => (
                      <p key={index} className="entry__text">
                        {gratitude}
                      </p>
                    ))}

                    <h2 className="entry__title">¿Qué haría grandioso hoy?</h2>
                    {goals.map((goal: string, index: number) => (
                      <p key={index} className="entry__text">
                        {goal}
                      </p>
                    ))}

                    <h2 className="entry__title">Estoy...</h2>
                    {affirmations.map((affirmation: string, index: number) => (
                      <p key={index} className="entry__text">
                        {affirmation}
                      </p>
                    ))}

                    <h2 className="entry__title">
                      Cosas increíbles que sucedieron hoy...
                    </h2>
                    {positiveExperiences.map(
                      (positiveExperience: string, index: number) => (
                        <p key={index} className="entry__text">
                          {positiveExperience}
                        </p>
                      )
                    )}

                    <h2 className="entry__title">
                      ¿Cómo podría haber mejorado aún más hoy?
                    </h2>
                    {improvements.map((improvement: string, index: number) => (
                      <p key={index} className="entry__text">
                        {improvement}
                      </p>
                    ))}
                  </div>
                )}

                {allEntriesOpen && <hr className="entry__divider" />}
              </section>
            );
          }
        )}

      {entries.length === 0 && (
        <p className="entry__text">No entries yet. Create one!</p>
      )}
    </main>
  );
};
