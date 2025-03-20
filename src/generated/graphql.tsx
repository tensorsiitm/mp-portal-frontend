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
  DateTimeISO: { input: any; output: any; }
};

export type Application = {
  __typename?: 'Application';
  aadhaar: Scalars['String']['output'];
  address: Scalars['String']['output'];
  appId: Scalars['String']['output'];
  comments: Array<Scalars['String']['output']>;
  creationDate: Scalars['DateTimeISO']['output'];
  expectedExpenditure: Scalars['Float']['output'];
  fileUrl: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  issue: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  remarks: Scalars['String']['output'];
  type: ApplicationType;
  user: User;
  year: Scalars['Float']['output'];
};

/** Type of Application */
export enum ApplicationType {
  Cmdrf = 'CMDRF',
  General = 'GENERAL',
  Pmnrf = 'PMNRF'
}

export type CreateApplicationInput = {
  aadhaar: Scalars['String']['input'];
  address?: InputMaybe<Scalars['String']['input']>;
  expectedExpenditure: Scalars['Float']['input'];
  fileUrl: Scalars['String']['input'];
  issue: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  remarks: Scalars['String']['input'];
  type: ApplicationType;
};

export type Eq = {
  __typename?: 'EQ';
  PNR: Scalars['String']['output'];
  area: Scalars['String']['output'];
  class: Scalars['String']['output'];
  date: Scalars['DateTimeISO']['output'];
  from: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  number: Scalars['Float']['output'];
  phone: Scalars['String']['output'];
  to: Scalars['String']['output'];
  train: Scalars['String']['output'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createApplication: Application;
  createEQ: Eq;
  createUser: User;
  deleteUser: Scalars['Boolean']['output'];
  loginUser: User;
};


export type MutationCreateApplicationArgs = {
  data: CreateApplicationInput;
};


export type MutationCreateEqArgs = {
  data: CreateEqInput;
};


export type MutationCreateUserArgs = {
  office: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationLoginUserArgs = {
  office: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getApplications: Array<Application>;
  getEQ: Array<Eq>;
  getMe: User;
  getUsers: Array<User>;
};

export type User = {
  __typename?: 'User';
  applications: Array<Application>;
  id: Scalars['ID']['output'];
  office: Scalars['String']['output'];
};

export type CreateEqInput = {
  PNR: Scalars['String']['input'];
  area: Scalars['String']['input'];
  class: Scalars['String']['input'];
  date: Scalars['DateTimeISO']['input'];
  from: Scalars['String']['input'];
  name: Scalars['String']['input'];
  number: Scalars['Float']['input'];
  phone: Scalars['String']['input'];
  to: Scalars['String']['input'];
  train: Scalars['String']['input'];
};

export type CreateApplicationMutationVariables = Exact<{
  data: CreateApplicationInput;
}>;


export type CreateApplicationMutation = { __typename?: 'Mutation', createApplication: { __typename?: 'Application', appId: string } };

export type CreateUserMutationVariables = Exact<{
  password: Scalars['String']['input'];
  office: Scalars['String']['input'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', office: string } };

export type LoginUserMutationVariables = Exact<{
  password: Scalars['String']['input'];
  office: Scalars['String']['input'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'User', office: string } };

export type CreateEqMutationVariables = Exact<{
  data: CreateEqInput;
}>;


export type CreateEqMutation = { __typename?: 'Mutation', createEQ: { __typename?: 'EQ', id: string } };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', getMe: { __typename?: 'User', office: string } };

export type GetApplicationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetApplicationsQuery = { __typename?: 'Query', getApplications: Array<{ __typename?: 'Application', appId: string, aadhaar: string, address: string, expectedExpenditure: number, issue: string, remarks: string, id: string, name: string, phone: string, year: number, comments: Array<string>, type: ApplicationType }> };

export type GetEqQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEqQuery = { __typename?: 'Query', getEQ: Array<{ __typename?: 'EQ', id: string, name: string, area: string, train: string, date: any, PNR: string, class: string, from: string, to: string, number: number, phone: string }> };


export const CreateApplicationDocument = gql`
    mutation CreateApplication($data: CreateApplicationInput!) {
  createApplication(data: $data) {
    appId
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
export const CreateUserDocument = gql`
    mutation CreateUser($password: String!, $office: String!) {
  createUser(password: $password, office: $office) {
    office
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      password: // value for 'password'
 *      office: // value for 'office'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($password: String!, $office: String!) {
  loginUser(password: $password, office: $office) {
    office
  }
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
 *      office: // value for 'office'
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
export const CreateEqDocument = gql`
    mutation CreateEQ($data: createEQInput!) {
  createEQ(data: $data) {
    id
  }
}
    `;
export type CreateEqMutationFn = Apollo.MutationFunction<CreateEqMutation, CreateEqMutationVariables>;

/**
 * __useCreateEqMutation__
 *
 * To run a mutation, you first call `useCreateEqMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEqMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEqMutation, { data, loading, error }] = useCreateEqMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateEqMutation(baseOptions?: Apollo.MutationHookOptions<CreateEqMutation, CreateEqMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEqMutation, CreateEqMutationVariables>(CreateEqDocument, options);
      }
export type CreateEqMutationHookResult = ReturnType<typeof useCreateEqMutation>;
export type CreateEqMutationResult = Apollo.MutationResult<CreateEqMutation>;
export type CreateEqMutationOptions = Apollo.BaseMutationOptions<CreateEqMutation, CreateEqMutationVariables>;
export const GetMeDocument = gql`
    query GetMe {
  getMe {
    office
  }
}
    `;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
      }
export function useGetMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export function useGetMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeSuspenseQueryHookResult = ReturnType<typeof useGetMeSuspenseQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;
export const GetApplicationsDocument = gql`
    query GetApplications {
  getApplications {
    appId
    aadhaar
    address
    expectedExpenditure
    issue
    remarks
    id
    name
    phone
    year
    comments
    type
  }
}
    `;

/**
 * __useGetApplicationsQuery__
 *
 * To run a query within a React component, call `useGetApplicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetApplicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetApplicationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetApplicationsQuery(baseOptions?: Apollo.QueryHookOptions<GetApplicationsQuery, GetApplicationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetApplicationsQuery, GetApplicationsQueryVariables>(GetApplicationsDocument, options);
      }
export function useGetApplicationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetApplicationsQuery, GetApplicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetApplicationsQuery, GetApplicationsQueryVariables>(GetApplicationsDocument, options);
        }
export function useGetApplicationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetApplicationsQuery, GetApplicationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetApplicationsQuery, GetApplicationsQueryVariables>(GetApplicationsDocument, options);
        }
export type GetApplicationsQueryHookResult = ReturnType<typeof useGetApplicationsQuery>;
export type GetApplicationsLazyQueryHookResult = ReturnType<typeof useGetApplicationsLazyQuery>;
export type GetApplicationsSuspenseQueryHookResult = ReturnType<typeof useGetApplicationsSuspenseQuery>;
export type GetApplicationsQueryResult = Apollo.QueryResult<GetApplicationsQuery, GetApplicationsQueryVariables>;
export const GetEqDocument = gql`
    query GetEQ {
  getEQ {
    id
    name
    area
    train
    date
    PNR
    class
    from
    to
    number
    phone
  }
}
    `;

/**
 * __useGetEqQuery__
 *
 * To run a query within a React component, call `useGetEqQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEqQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEqQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetEqQuery(baseOptions?: Apollo.QueryHookOptions<GetEqQuery, GetEqQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEqQuery, GetEqQueryVariables>(GetEqDocument, options);
      }
export function useGetEqLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEqQuery, GetEqQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEqQuery, GetEqQueryVariables>(GetEqDocument, options);
        }
export function useGetEqSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEqQuery, GetEqQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEqQuery, GetEqQueryVariables>(GetEqDocument, options);
        }
export type GetEqQueryHookResult = ReturnType<typeof useGetEqQuery>;
export type GetEqLazyQueryHookResult = ReturnType<typeof useGetEqLazyQuery>;
export type GetEqSuspenseQueryHookResult = ReturnType<typeof useGetEqSuspenseQuery>;
export type GetEqQueryResult = Apollo.QueryResult<GetEqQuery, GetEqQueryVariables>;