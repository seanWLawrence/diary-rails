import React, { FC, useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';

import './new.css';

let UPSERT_ENTRY_MUTATION = gql`
  mutation UpsertEntryMutation(
    $gratitudes: [String!]!
    $goals: [String!]!
    $affirmations: [String!]!
    $positiveExperiences: [String!]
    $improvements: [String!]
  ) {
    upsertEntry(
      gratitudes: $gratitudes
      goals: $goals
      affirmations: $affirmations
      positiveExperiences: $positiveExperiences
      improvements: $improvements
    ) {
      errors
      success
    }
  }
`;

interface NewEntryState {
  gratitudes: string[];
  goals: string[];
  affirmations: string[];
  positiveExperiences: string[];
  improvements: string[];
}

export let NewEntry: FC<{}> = () => {
  let [newEntry, setNewEntry] = useState<NewEntryState>({
    gratitudes: [''],
    goals: [''],
    affirmations: [''],
    positiveExperiences: [''],
    improvements: [''],
  });

  console.log(newEntry.gratitudes);

  return (
    <main className="main__wrapper">
      <Link to="/entries" className="title__anchor">
        <h1 className="title">Diario de 5 minutos</h1>
      </Link>

      <nav className="nav">
        <Link to="/entries/" className="nav__anchor">
          todo entradas
        </Link>
      </nav>

      <form className="new-entry__form">
        <h2 className="new-entry__title">Estoy agradecido por...</h2>

        {newEntry.gratitudes.map((gratitude: string, index: number) => {
          let isLastInput = newEntry.gratitudes.length - 1 === index;
          return (
            <label className="new-entry__label" key={index}>
              Agradecido #{index + 1}
              <input
                type="text"
                className="new-entry__input"
                value={gratitude}
                required
                onChange={v =>
                  setNewEntry({
                    ...newEntry,
                    gratitudes: newEntry.gratitudes.map(
                      (g: string, i: number) => {
                        return i === index ? v.target.value : g;
                      }
                    ),
                  })
                }
              />
              {isLastInput && (
                <div className="new-entry__button-wrapper">
                  <button
                    type="button"
                    className="new-entry__button--add"
                    onClick={() =>
                      setNewEntry({
                        ...newEntry,
                        gratitudes: [...newEntry.gratitudes, ''],
                      })
                    }
                  >
                    Add new
                  </button>
                </div>
              )}
            </label>
          );
        })}
        <label className="new-entry__label">¿Qué haría grandioso hoy?</label>
        <label className="new-entry__label">Estoy...</label>
        <label className="new-entry__label">
          Cosas increíbles que sucedieron hoy...
        </label>
        <label className="new-entry__label">
          ¿Cómo podría haber mejorado aún más hoy?
        </label>
      </form>
    </main>
  );
};

export default NewEntry;
