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
        onClick={() =>
          toggleEntriesOpen(
            entriesOpen.length === 0 ? entries.map(e => e.id) : []
          )
        }
      >
        {entriesOpen.length === 0 ? 'Open all +' : 'Collapse all -'}
      </button>

      {entries.map(
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
                  <h2 className="entry__title">I'm grateful for</h2>
                  {gratitudes.map((gratitude: string, index: number) => {
                    return <p key={index}>{gratitude}</p>;
                  })}

                  <h2>Today I'm doing</h2>
                  {goals.map((goal: string, index: number) => {
                    return <p key={index}>{goal}</p>;
                  })}

                  <h2>I'm a</h2>
                  {affirmations.map((affirmation: string, index: number) => {
                    return <p key={index}>{affirmation}</p>;
                  })}

                  <h2>Was great today when</h2>
                  {positiveExperiences.map(
                    (positiveExperience: string, index: number) => {
                      return <p key={index}>{positiveExperience}</p>;
                    }
                  )}

                  <h2>Will improve on</h2>
                  {improvements.map((improvement: string, index: number) => {
                    return <p key={index}>{improvement}</p>;
                  })}
                </div>
              )}
            </section>
          );
        }
      )}
    </main>
  );
};
