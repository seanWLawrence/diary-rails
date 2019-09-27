/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EntriesQuery
// ====================================================

export interface EntriesQuery_entries {
  __typename: "Entry";
  id: string;
  dateCreated: string;
  gratitudes: string[];
  goals: string[];
  affirmations: string[];
  positiveExperiences: string[];
  improvements: string[];
  thingsLearned: string[];
}

export interface EntriesQuery {
  entries: EntriesQuery_entries[];
}
