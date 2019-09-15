import React, { FC, useState, FormEvent, ChangeEvent } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';

import UPSERT_ENTRY_MUTATION, {
  UpsertEntryMutation,
  UpsertEntryMutationVariables,
} from './upsert-entry.graphql';

import './new.css';

interface InputGroupProps {
  setState: React.Dispatch<React.SetStateAction<NewEntryState>>;
  state: NewEntryState;
  name: string;
  label: string;
}

let InputGroup: FC<InputGroupProps> = ({ setState, state, name, label }) => {
  let addNewInput = () =>
    setState({
      ...state,
      [name]: [...state[name], ''],
    });

  let onInputChange = (index: number) => (
    event: ChangeEvent<HTMLInputElement>
  ): void =>
    setState({
      ...state,
      [name]: state[name].map(
        (existingValue: string, existingIndex: number) => {
          return index === existingIndex ? event.target.value : existingValue;
        }
      ),
    });

  return (
    <>
      {state[name].map((value: string, index: number) => {
        let isLastInput = state[name].length - 1 === index;

        return (
          <label className="new-entry__label" key={index}>
            {label} #{index + 1}
            <input
              type="text"
              className="new-entry__input"
              value={value}
              required
              onChange={onInputChange(index)}
            />
            {isLastInput && (
              <div className="new-entry__button-wrapper">
                <button
                  type="button"
                  className="new-entry__button--add"
                  onClick={addNewInput}
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

let onSubmit = (fn: Function) => (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  fn();
};

export let NewEntry: FC<{}> = () => {
  let [newEntry, setNewEntry] = useState<NewEntryState>({
    gratitudes: [''],
    goals: [''],
    affirmations: [''],
    positiveExperiences: [''],
    improvements: [''],
  });

  let [upsertEntry, { data }] = useMutation(UPSERT_ENTRY_MUTATION, {
    variables: newEntry,
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

      <form className="new-entry__form" onSubmit={onSubmit(upsertEntry)}>
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

        <button>Save</button>

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

        <button>Save</button>
      </form>
    </main>
  );
};

export default NewEntry;
