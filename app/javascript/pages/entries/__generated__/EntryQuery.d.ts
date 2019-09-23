/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EntryQuery
// ====================================================

export interface EntryQuery_entry {
  __typename: "Entry";
  id: string;
  dateCreated: string;
  gratitudes: string[];
  goals: string[];
  affirmations: string[];
  positiveExperiences: string[];
  improvements: string[];
}

export interface EntryQuery {
  entry: EntryQuery_entry | null;
}

export interface EntryQueryVariables {
  id: string;
}
