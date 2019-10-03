import { useMutation } from '@apollo/react-hooks';
import React, { FC, FormEvent, useState } from 'react';
import ENTRIES_QUERY, { EntriesQuery } from '../../entries.graphql';
import InputGroup from '../input-group';
import UPSERT_ENTRY_MUTATION, {
  UpsertEntryMutation,
  UpsertEntryMutationVariables,
} from './upsert-entry.graphql';

import './index.sass';

let onSubmit = (fn: (val?: any) => void) => (
  event: FormEvent<HTMLFormElement>,
) => {
  event.preventDefault();

  fn();
};

interface Entry {
  affirmations: string[];
  goals: string[];
  gratitudes: string[];
  improvements: string[];
  positiveExperiences: string[];
  thingsLearned: string[];
}

interface EntryFormProps {
  push: (path: string) => void;
  entry?: Entry;
}

let defaultEntry = {
  affirmations: [''],
  goals: [''],
  gratitudes: [''],
  improvements: [''],
  positiveExperiences: [''],
  thingsLearned: [''],
};

let EntryForm: FC<EntryFormProps> = ({ push, entry = defaultEntry }) => {
  let [entryState, setEntryState] = useState<Entry>(entry);

  let [viewAllFields, setViewAllFields] = useState(false);

  let [upsertEntry] = useMutation<
    UpsertEntryMutation,
    UpsertEntryMutationVariables
  >(UPSERT_ENTRY_MUTATION, {
    variables: entryState,
    update(
      cache,
      {
        data: {
          upsertEntry: { success, entry: upsertedEntry },
        },
      },
    ) {
      if (success) {
        try {
          let data: EntriesQuery = cache.readQuery({ query: ENTRIES_QUERY });

          let filteredEntries = data.entries.filter(
            ({ id }) => id !== upsertedEntry.id,
          );

          data.entries = [...filteredEntries, upsertedEntry].sort(
            ({ dateCreated: a }, { dateCreated: b }) => {
              return new Date(b).getTime() - new Date(a).getTime();
            },
          );

          cache.writeQuery({
            data,
            query: ENTRIES_QUERY,
          });
        } catch (_) {
          cache.writeQuery({
            data: { entries: [upsertedEntry] },
            query: ENTRIES_QUERY,
          });
        } finally {
          push('/entries');
        }
      }
    },
  });

  return (
    <form className="entry-form__form" onSubmit={onSubmit(upsertEntry)}>
      <InputGroup
        groupName="Estoy agradecido por..."
        name="gratitudes"
        setState={setEntryState}
        state={entryState}
        label="Agradecio"
        required
      />

      <InputGroup
        groupName="Qué haría grandioso hoy?"
        name="goals"
        setState={setEntryState}
        state={entryState}
        label="Metra"
        required
      />

      <InputGroup
        groupName="Estoy..."
        name="affirmations"
        setState={setEntryState}
        state={entryState}
        label="Affirma"
        required
      />
      {viewAllFields && (
        <>
          <InputGroup
            groupName="Cosas increíbles que sucedieron hoy..."
            name="positiveExperiences"
            setState={setEntryState}
            state={entryState}
            label="Increible cosa"
          />

          <InputGroup
            groupName="¿Cómo podría haber mejorado aún más hoy?"
            name="improvements"
            setState={setEntryState}
            state={entryState}
            label="Mejorado"
          />

          <InputGroup
            groupName="Cosas aprendidas"
            name="thingsLearned"
            setState={setEntryState}
            state={entryState}
            label="Cosa aprendida"
          />
        </>
      )}

      <div
        className={`entry-form__button-wrapper--${
          viewAllFields ? 'center' : 'space-between'
        }`}
      >
        {!viewAllFields && (
          <button
            className="entry-form__button--view-all-fields"
            type="button"
            onClick={() => setViewAllFields(true)}
          >
            View all fields
          </button>
        )}

        <button className="entry-form__button--save">Save</button>
      </div>
    </form>
  );
};

export default EntryForm;
