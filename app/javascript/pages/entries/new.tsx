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

interface InputGroupProps {
  setState: React.Dispatch<React.SetStateAction<NewEntryState>>;
  state: NewEntryState;
  name: string;
  label: string;
}

let InputGroup: FC<InputGroupProps> = ({ setState, state, name, label }) => {
  return (
    <>
      {state[name].map((value, index) => {
        let isLastInput = state[name].length - 1 === index;

        return (
          <label className="new-entry__label" key={index}>
            {label} #{index + 1}
            <input
              type="text"
              className="new-entry__input"
              value={value}
              required
              onChange={v =>
                setState({
                  ...state,
                  [name]: state[name].map(
                    (existingValue: string, existingIndex: number) => {
                      return index === existingIndex
                        ? value.target.value
                        : existingValue;
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
                    setState({
                      ...state,
                      [name]: [...state[name], ''],
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
    </>
  );
};

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

  return (
    <main className="new-entry__main-wrapper">
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

        <InputGroup
          name="gratitudes"
          setState={setNewEntry}
          state={newEntry}
          label="Agradecio"
        />

        <h2 className="new-entry__title">¿Qué haría grandioso hoy?</h2>

        <InputGroup
          name="goals"
          setState={setNewEntry}
          state={newEntry}
          label="Metra"
        />

        <h2 className="new-entry__title">Estoy...</h2>

        <InputGroup
          name="affirmations"
          setState={setNewEntry}
          state={newEntry}
          label="Affirma"
        />

        <h2 className="new-entry__title">
          Cosas increíbles que sucedieron hoy...
        </h2>

        <InputGroup
          name="positiveExperiences"
          setState={setNewEntry}
          state={newEntry}
          label="Increible cosa"
        />

        <h2 className="new-entry__title">
          ¿Cómo podría haber mejorado aún más hoy?
        </h2>

        <InputGroup
          name="improvements"
          setState={setNewEntry}
          state={newEntry}
          label="Mejorado"
        />
      </form>
    </main>
  );
};

export default NewEntry;
