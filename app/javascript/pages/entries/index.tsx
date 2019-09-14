import React, { FC } from 'react';
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error!</p>;
  }

  let { entries } = data;

  return (
    <main>
      <h1>Diario de 5 minutos</h1>

      <nav>
        <Link to="/entries">entradas</Link>
        <Link to="/entries/new">nueva entrada</Link>
      </nav>

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
          return (
            <div key={id}>
              <h2>{dateCreated}</h2>
              <h2>I'm grateful for</h2>
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
          );
        }
      )}
    </main>
  );
};
