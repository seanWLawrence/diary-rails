import React, { FC, useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';

import './index.css';

let ENTRIES_QUERY = gql`
  query EntriesQuery {
    entries {
      id
      dateCreated
      gratitudes
      goals
      affirmations
      positiveExperiences
      improvements
    }
  }
`;

interface EntriesData {
  entries: Array<{
    id: string;
    dateCreated: string;
    gratitudes: string[];
    goals: string[];
    affirmations: string[];
    positiveExperiences: string[];
    improvements: string[];
  }>;
}

export let Entries: FC<{}> = () => {
  let { loading, error, data } = useQuery<EntriesData>(ENTRIES_QUERY);
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
      <h1 className="title">
        <Link to="/entries" className="title__anchor">
          Diario de 5 minutos
        </Link>
      </h1>

      <nav className="nav">
        <Link to="/entries/new" className="nav__anchor">
          nueva entrada
        </Link>
      </nav>

      <button
        className="entries__toggle-collpase-button"
        onClick={() =>
          toggleEntriesOpen(allEntriesOpen ? [] : entries.map(e => e.id))
        }
      >
        {allEntriesOpen ? 'Collapse all -' : 'Open all +'}
      </button>

      {entries.map(
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
          index
        ) => {
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
                  {gratitudes.map((gratitude: string, index: number) => {
                    return (
                      <p key={index} className="entry__text">
                        {gratitude}
                      </p>
                    );
                  })}

                  <h2 className="entry__title">¿Qué haría grandioso hoy?</h2>
                  {goals.map((goal: string, index: number) => {
                    return (
                      <p key={index} className="entry__text">
                        {goal}
                      </p>
                    );
                  })}

                  <h2 className="entry__title">Estoy...</h2>
                  {affirmations.map((affirmation: string, index: number) => {
                    return (
                      <p key={index} className="entry__text">
                        {affirmation}
                      </p>
                    );
                  })}

                  <h2 className="entry__title">
                    Cosas increíbles que sucedieron hoy...
                  </h2>
                  {positiveExperiences.map(
                    (positiveExperience: string, index: number) => {
                      return (
                        <p key={index} className="entry__text">
                          {positiveExperience}
                        </p>
                      );
                    }
                  )}

                  <h2 className="entry__title">
                    ¿Cómo podría haber mejorado aún más hoy?
                  </h2>
                  {improvements.map((improvement: string, index: number) => {
                    return (
                      <p key={index} className="entry__text">
                        {improvement}
                      </p>
                    );
                  })}
                </div>
              )}

              {allEntriesOpen && <hr className="entry__divider" />}
            </section>
          );
        }
      )}
    </main>
  );
};
