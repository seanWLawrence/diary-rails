/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpsertEntryMutation
// ====================================================

export interface UpsertEntryMutation_upsertEntry {
  __typename: "UpsertEntryPayload";
  errors: string[] | null;
  success: boolean;
}

export interface UpsertEntryMutation {
  upsertEntry: UpsertEntryMutation_upsertEntry | null;
}

export interface UpsertEntryMutationVariables {
  gratitudes: string[];
  goals: string[];
  affirmations: string[];
  positiveExperiences?: string[] | null;
  improvements?: string[] | null;
}
