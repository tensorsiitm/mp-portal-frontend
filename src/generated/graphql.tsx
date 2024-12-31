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
  tag: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createApplication: Application;
  loginUser: Scalars['Boolean']['output'];
};


export type MutationCreateApplicationArgs = {
  data: CreateApplicationInput;
};


export type MutationLoginUserArgs = {
  password: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getApplications: Array<Application>;
  getCMNRFApplications: Array<Application>;
  getPMNRFApplications: Array<Application>;
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

export type LoginUserMutationVariables = Exact<{
  password: Scalars['String']['input'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: boolean };

export type GetPmnrfApplicationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPmnrfApplicationsQuery = { __typename?: 'Query', getPMNRFApplications: Array<{ __typename?: 'Application', aadhaar: string, address: string, expectedExpenditure: number, healthIssue: string, hospital: string, id: string, name: string, phone: string }> };

export type GetCmnrfApplicationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCmnrfApplicationsQuery = { __typename?: 'Query', getCMNRFApplications: Array<{ __typename?: 'Application', aadhaar: string, address: string, expectedExpenditure: number, healthIssue: string, hospital: string, id: string, name: string, phone: string, tag: Tagtype }> };


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
export const LoginUserDocument = gql`
    mutation LoginUser($password: String!) {
  loginUser(password: $password)
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const GetPmnrfApplicationsDocument = gql`
    query GetPMNRFApplications {
  getPMNRFApplications {
    aadhaar
    address
    expectedExpenditure
    healthIssue
    hospital
    id
    name
    phone
  }
}
    `;

/**
 * __useGetPmnrfApplicationsQuery__
 *
 * To run a query within a React component, call `useGetPmnrfApplicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPmnrfApplicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPmnrfApplicationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPmnrfApplicationsQuery(baseOptions?: Apollo.QueryHookOptions<GetPmnrfApplicationsQuery, GetPmnrfApplicationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPmnrfApplicationsQuery, GetPmnrfApplicationsQueryVariables>(GetPmnrfApplicationsDocument, options);
      }
export function useGetPmnrfApplicationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPmnrfApplicationsQuery, GetPmnrfApplicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPmnrfApplicationsQuery, GetPmnrfApplicationsQueryVariables>(GetPmnrfApplicationsDocument, options);
        }
export function useGetPmnrfApplicationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPmnrfApplicationsQuery, GetPmnrfApplicationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPmnrfApplicationsQuery, GetPmnrfApplicationsQueryVariables>(GetPmnrfApplicationsDocument, options);
        }
export type GetPmnrfApplicationsQueryHookResult = ReturnType<typeof useGetPmnrfApplicationsQuery>;
export type GetPmnrfApplicationsLazyQueryHookResult = ReturnType<typeof useGetPmnrfApplicationsLazyQuery>;
export type GetPmnrfApplicationsSuspenseQueryHookResult = ReturnType<typeof useGetPmnrfApplicationsSuspenseQuery>;
export type GetPmnrfApplicationsQueryResult = Apollo.QueryResult<GetPmnrfApplicationsQuery, GetPmnrfApplicationsQueryVariables>;
export const GetCmnrfApplicationsDocument = gql`
    query GetCMNRFApplications {
  getCMNRFApplications {
    aadhaar
    address
    expectedExpenditure
    healthIssue
    hospital
    id
    name
    phone
    tag
  }
}
    `;

/**
 * __useGetCmnrfApplicationsQuery__
 *
 * To run a query within a React component, call `useGetCmnrfApplicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCmnrfApplicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCmnrfApplicationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCmnrfApplicationsQuery(baseOptions?: Apollo.QueryHookOptions<GetCmnrfApplicationsQuery, GetCmnrfApplicationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCmnrfApplicationsQuery, GetCmnrfApplicationsQueryVariables>(GetCmnrfApplicationsDocument, options);
      }
export function useGetCmnrfApplicationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCmnrfApplicationsQuery, GetCmnrfApplicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCmnrfApplicationsQuery, GetCmnrfApplicationsQueryVariables>(GetCmnrfApplicationsDocument, options);
        }
export function useGetCmnrfApplicationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCmnrfApplicationsQuery, GetCmnrfApplicationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCmnrfApplicationsQuery, GetCmnrfApplicationsQueryVariables>(GetCmnrfApplicationsDocument, options);
        }
export type GetCmnrfApplicationsQueryHookResult = ReturnType<typeof useGetCmnrfApplicationsQuery>;
export type GetCmnrfApplicationsLazyQueryHookResult = ReturnType<typeof useGetCmnrfApplicationsLazyQuery>;
export type GetCmnrfApplicationsSuspenseQueryHookResult = ReturnType<typeof useGetCmnrfApplicationsSuspenseQuery>;
export type GetCmnrfApplicationsQueryResult = Apollo.QueryResult<GetCmnrfApplicationsQuery, GetCmnrfApplicationsQueryVariables>;