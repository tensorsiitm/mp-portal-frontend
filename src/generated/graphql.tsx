import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Application = {
  __typename?: 'Application';
  aadhaar: Scalars['String']['output'];
  address: Scalars['String']['output'];
  expectedExpenditure: Scalars['Float']['output'];
  healthIssue: Scalars['String']['output'];
  hospital: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  tag: Tagtype;
};

export type CreateApplicationInput = {
  aadhaar: Scalars['String']['input'];
  address: Scalars['String']['input'];
  expectedExpenditure: Scalars['Float']['input'];
  healthIssue: Scalars['String']['input'];
  hospital: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  tag?: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createApplication: Application;
};


export type MutationCreateApplicationArgs = {
  data: CreateApplicationInput;
};

export type Query = {
  __typename?: 'Query';
  applications: Array<Application>;
  getUsers: Array<User>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
};

/** The basic directions of the application */
export enum Tagtype {
  Cmnrf = 'cmnrf',
  Pmnrf = 'pmnrf'
}

export type CreateApplicationMutationVariables = Exact<{
  data: CreateApplicationInput;
}>;


export type CreateApplicationMutation = { __typename?: 'Mutation', createApplication: { __typename?: 'Application', id: string } };


export const CreateApplicationDocument = gql`
    mutation CreateApplication($data: CreateApplicationInput!) {
  createApplication(data: $data) {
    id
  }
}
    `;
export type CreateApplicationMutationFn = Apollo.MutationFunction<CreateApplicationMutation, CreateApplicationMutationVariables>;

/**
 * __useCreateApplicationMutation__
 *
 * To run a mutation, you first call `useCreateApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createApplicationMutation, { data, loading, error }] = useCreateApplicationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateApplicationMutation(baseOptions?: Apollo.MutationHookOptions<CreateApplicationMutation, CreateApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateApplicationMutation, CreateApplicationMutationVariables>(CreateApplicationDocument, options);
      }
export type CreateApplicationMutationHookResult = ReturnType<typeof useCreateApplicationMutation>;
export type CreateApplicationMutationResult = Apollo.MutationResult<CreateApplicationMutation>;
export type CreateApplicationMutationOptions = Apollo.BaseMutationOptions<CreateApplicationMutation, CreateApplicationMutationVariables>;