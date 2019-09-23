/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpsertEntryMutation
// ====================================================

export interface UpsertEntryMutation_upsertEntry_entry {
  __typename: "Entry";
  id: string;
  gratitudes: string[];
  goals: string[];
  affirmations: string[];
  positiveExperiences: string[];
  improvements: string[];
  dateCreated: string;
}

export interface UpsertEntryMutation_upsertEntry {
  __typename: "UpsertEntryPayload";
  errors: string[] | null;
  success: boolean;
  entry: UpsertEntryMutation_upsertEntry_entry | null;
}

export interface UpsertEntryMutation {
  upsertEntry: UpsertEntryMutation_upsertEntry | null;
}

export interface UpsertEntryMutationVariables {
  id?: string | null;
  gratitudes: string[];
  goals: string[];
  affirmations: string[];
  positiveExperiences?: string[] | null;
  improvements?: string[] | null;
}
