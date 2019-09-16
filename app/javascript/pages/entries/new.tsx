import { useMutation } from '@apollo/react-hooks';
import React, { FC, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import InputGroup from '../../components/input-group';

import UPSERT_ENTRY_MUTATION, {
  UpsertEntryMutation,
  UpsertEntryMutationVariables,
} from './upsert-entry.graphql';
import ENTRIES_QUERY, { EntriesQuery } from './entries.graphql';

import './new.sass';

interface NewEntryProps {
  history: {
    push: (path: string) => void;
  };
}

interface NewEntryState {
  affirmations: string[];
  goals: string[];
  gratitudes: string[];
  improvements: string[];
  positiveExperiences: string[];
}

let onSubmit = (fn: (val?: any) => void) => (
  event: FormEvent<HTMLFormElement>,
) => {
  event.preventDefault();

  fn();
};

export let NewEntry: FC<NewEntryProps> = ({ history: { push } }) => {
  let [newEntry, setNewEntry] = useState<NewEntryState>({
    affirmations: [''],
    goals: [''],
    gratitudes: [''],
    improvements: [''],
    positiveExperiences: [''],
  });

  let [upsertEntry] = useMutation<
    UpsertEntryMutation,
    UpsertEntryMutationVariables
  >(UPSERT_ENTRY_MUTATION, {
    variables: newEntry,
    update(
      cache,
      {
        data: {
          upsertEntry: { success, entry },
        },
      },
    ) {
      if (success) {
        let data: EntriesQuery = cache.readQuery({ query: ENTRIES_QUERY });

        data.entries = [...data.entries, entry];

        cache.writeQuery({
          query: ENTRIES_QUERY,
          data,
        });

        push('/entries');
      }
    },
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

      <form
        className="new-entry__form"
        onSubmit={onSubmit(() => {
          upsertEntry();
        })}
      >
        <h2 className="new-entry__title">Estoy agradecido por...</h2>

        <InputGroup
          name="gratitudes"
          setState={setNewEntry}
          state={newEntry}
          label="Agradecio"
          required
        />

        <h2 className="new-entry__title">¿Qué haría grandioso hoy?</h2>

        <InputGroup
          name="goals"
          setState={setNewEntry}
          state={newEntry}
          label="Metra"
          required
        />

        <h2 className="new-entry__title">Estoy...</h2>

        <InputGroup
          name="affirmations"
          setState={setNewEntry}
          state={newEntry}
          label="Affirma"
          required
        />

        <div className="new-entry__button-wrapper">
          <button>Save</button>
        </div>

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
        <div className="new-entry__button-wrapper">
          <button>Save</button>
        </div>
      </form>
    </main>
  );
};

export default NewEntry;
