import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
  Timestamp: any;
  Upload: any;
};

/** A banner */
export type Banner = {
  __typename?: "Banner";
  alternativeText: Scalars["String"];
  createdAt: Scalars["Timestamp"];
  enabled: Scalars["Boolean"];
  id: Scalars["ID"];
  images?: Maybe<Array<BannerImage>>;
  name: Scalars["String"];
  updatedAt: Scalars["Timestamp"];
};

/** An Image of banner */
export type BannerImage = {
  __typename?: "BannerImage";
  bucket: Scalars["String"];
  height: Scalars["Int"];
  id: Scalars["ID"];
  isOriginal: Scalars["Boolean"];
  path: Scalars["String"];
  totalBytes: Scalars["Int"];
  type: Scalars["String"];
  url: Scalars["String"];
  width: Scalars["Int"];
};

export type CreateBannerInput = {
  alternativeText: Scalars["String"];
  name: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createBanner: Banner;
  createTaskBannerHide: Task;
  createTaskBannerShow: Task;
  createTaskProductDisableProductOfTheDay: Task;
  createTaskProductEnableProductOfTheDay: Task;
  removeBanner: Scalars["String"];
  updateBanner: Banner;
  uploadBannerImage: Scalars["Boolean"];
};

export type MutationCreateBannerArgs = {
  data: CreateBannerInput;
  shopId: Scalars["ID"];
};

export type MutationCreateTaskBannerHideArgs = {
  bannerId: Scalars["ID"];
  shopId: Scalars["ID"];
  triggerAt: Scalars["Timestamp"];
};

export type MutationCreateTaskBannerShowArgs = {
  bannerId: Scalars["ID"];
  shopId: Scalars["ID"];
  triggerAt: Scalars["Timestamp"];
};

export type MutationCreateTaskProductDisableProductOfTheDayArgs = {
  productId: Scalars["ID"];
  shopId: Scalars["ID"];
  triggerAt: Scalars["Timestamp"];
};

export type MutationCreateTaskProductEnableProductOfTheDayArgs = {
  productId: Scalars["ID"];
  shopId: Scalars["ID"];
  triggerAt: Scalars["Timestamp"];
};

export type MutationRemoveBannerArgs = {
  bannerId: Scalars["ID"];
};

export type MutationUpdateBannerArgs = {
  data: UpdateBannerInput;
};

export type MutationUploadBannerImageArgs = {
  data: UploadInput;
};

export type Query = {
  __typename?: "Query";
  banner: Banner;
  banners: Array<Banner>;
  tasks: Array<Task>;
};

export type QueryBannerArgs = {
  id: Scalars["ID"];
};

export type QueryBannersArgs = {
  shopId: Scalars["ID"];
};

export type QueryTasksArgs = {
  shopId: Scalars["ID"];
};

/** Generic task */
export type Task = {
  __typename?: "Task";
  draft: Scalars["Boolean"];
  enabled: Scalars["Boolean"];
  id: Scalars["ID"];
  payload: Scalars["JSON"];
};

export type UpdateBannerInput = {
  alternativeText: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type UploadInput = {
  id: Scalars["ID"];
  image: Scalars["Upload"];
};

export type CreateBannerMutationVariables = Exact<{
  shopId: Scalars["ID"];
  name: Scalars["String"];
  alternativeText: Scalars["String"];
}>;

export type CreateBannerMutation = {
  __typename?: "Mutation";
  createBanner: {
    __typename?: "Banner";
    id: string;
    alternativeText: string;
    name: string;
  };
};

export type GetBannerQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type GetBannerQuery = {
  __typename?: "Query";
  banner: { __typename?: "Banner"; name: string; alternativeText: string };
};

export type GetBannersQueryVariables = Exact<{
  shopId: Scalars["ID"];
}>;

export type GetBannersQuery = {
  __typename?: "Query";
  banners: Array<{
    __typename?: "Banner";
    id: string;
    name: string;
    alternativeText: string;
    enabled: boolean;
    createdAt: any;
    updatedAt: any;
    images?: Array<{ __typename?: "BannerImage"; id: string }> | null;
  }>;
};

export type RemoveBannerMutationVariables = Exact<{
  bannerId: Scalars["ID"];
}>;

export type RemoveBannerMutation = {
  __typename?: "Mutation";
  removeBanner: string;
};

export type GetBannerImagesQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type GetBannerImagesQuery = {
  __typename?: "Query";
  banner: {
    __typename?: "Banner";
    id: string;
    name: string;
    images?: Array<{
      __typename?: "BannerImage";
      id: string;
      width: number;
      height: number;
      type: string;
      totalBytes: number;
      path: string;
      isOriginal: boolean;
      url: string;
    }> | null;
  };
};

export type UpdateBannerMutationVariables = Exact<{
  id: Scalars["ID"];
  name: Scalars["String"];
  alternativeText: Scalars["String"];
}>;

export type UpdateBannerMutation = {
  __typename?: "Mutation";
  updateBanner: {
    __typename?: "Banner";
    id: string;
    name: string;
    alternativeText: string;
    updatedAt: any;
  };
};

export type UploadBannerImageMutationVariables = Exact<{
  id: Scalars["ID"];
  image: Scalars["Upload"];
}>;

export type UploadBannerImageMutation = {
  __typename?: "Mutation";
  uploadBannerImage: boolean;
};

export type GetTasksQueryVariables = Exact<{
  shopId: Scalars["ID"];
}>;

export type GetTasksQuery = {
  __typename?: "Query";
  tasks: Array<{
    __typename?: "Task";
    id: string;
    draft: boolean;
    enabled: boolean;
  }>;
};

export const CreateBannerDocument = gql`
  mutation CreateBanner(
    $shopId: ID!
    $name: String!
    $alternativeText: String!
  ) {
    createBanner(
      shopId: $shopId
      data: { name: $name, alternativeText: $alternativeText }
    ) {
      id
      alternativeText
      name
    }
  }
`;
export type CreateBannerMutationFn = Apollo.MutationFunction<
  CreateBannerMutation,
  CreateBannerMutationVariables
>;

/**
 * __useCreateBannerMutation__
 *
 * To run a mutation, you first call `useCreateBannerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBannerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBannerMutation, { data, loading, error }] = useCreateBannerMutation({
 *   variables: {
 *      shopId: // value for 'shopId'
 *      name: // value for 'name'
 *      alternativeText: // value for 'alternativeText'
 *   },
 * });
 */
export function useCreateBannerMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateBannerMutation,
    CreateBannerMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateBannerMutation,
    CreateBannerMutationVariables
  >(CreateBannerDocument, options);
}
export type CreateBannerMutationHookResult = ReturnType<
  typeof useCreateBannerMutation
>;
export type CreateBannerMutationResult =
  Apollo.MutationResult<CreateBannerMutation>;
export type CreateBannerMutationOptions = Apollo.BaseMutationOptions<
  CreateBannerMutation,
  CreateBannerMutationVariables
>;
export const GetBannerDocument = gql`
  query GetBanner($id: ID!) {
    banner(id: $id) {
      name
      alternativeText
    }
  }
`;

/**
 * __useGetBannerQuery__
 *
 * To run a query within a React component, call `useGetBannerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBannerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBannerQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBannerQuery(
  baseOptions: Apollo.QueryHookOptions<GetBannerQuery, GetBannerQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetBannerQuery, GetBannerQueryVariables>(
    GetBannerDocument,
    options,
  );
}
export function useGetBannerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetBannerQuery,
    GetBannerQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetBannerQuery, GetBannerQueryVariables>(
    GetBannerDocument,
    options,
  );
}
export type GetBannerQueryHookResult = ReturnType<typeof useGetBannerQuery>;
export type GetBannerLazyQueryHookResult = ReturnType<
  typeof useGetBannerLazyQuery
>;
export type GetBannerQueryResult = Apollo.QueryResult<
  GetBannerQuery,
  GetBannerQueryVariables
>;
export const GetBannersDocument = gql`
  query GetBanners($shopId: ID!) {
    banners(shopId: $shopId) {
      id
      name
      alternativeText
      enabled
      createdAt
      updatedAt
      images {
        id
      }
    }
  }
`;

/**
 * __useGetBannersQuery__
 *
 * To run a query within a React component, call `useGetBannersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBannersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBannersQuery({
 *   variables: {
 *      shopId: // value for 'shopId'
 *   },
 * });
 */
export function useGetBannersQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetBannersQuery,
    GetBannersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetBannersQuery, GetBannersQueryVariables>(
    GetBannersDocument,
    options,
  );
}
export function useGetBannersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetBannersQuery,
    GetBannersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetBannersQuery, GetBannersQueryVariables>(
    GetBannersDocument,
    options,
  );
}
export type GetBannersQueryHookResult = ReturnType<typeof useGetBannersQuery>;
export type GetBannersLazyQueryHookResult = ReturnType<
  typeof useGetBannersLazyQuery
>;
export type GetBannersQueryResult = Apollo.QueryResult<
  GetBannersQuery,
  GetBannersQueryVariables
>;
export const RemoveBannerDocument = gql`
  mutation RemoveBanner($bannerId: ID!) {
    removeBanner(bannerId: $bannerId)
  }
`;
export type RemoveBannerMutationFn = Apollo.MutationFunction<
  RemoveBannerMutation,
  RemoveBannerMutationVariables
>;

/**
 * __useRemoveBannerMutation__
 *
 * To run a mutation, you first call `useRemoveBannerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveBannerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeBannerMutation, { data, loading, error }] = useRemoveBannerMutation({
 *   variables: {
 *      bannerId: // value for 'bannerId'
 *   },
 * });
 */
export function useRemoveBannerMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveBannerMutation,
    RemoveBannerMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RemoveBannerMutation,
    RemoveBannerMutationVariables
  >(RemoveBannerDocument, options);
}
export type RemoveBannerMutationHookResult = ReturnType<
  typeof useRemoveBannerMutation
>;
export type RemoveBannerMutationResult =
  Apollo.MutationResult<RemoveBannerMutation>;
export type RemoveBannerMutationOptions = Apollo.BaseMutationOptions<
  RemoveBannerMutation,
  RemoveBannerMutationVariables
>;
export const GetBannerImagesDocument = gql`
  query GetBannerImages($id: ID!) {
    banner(id: $id) {
      id
      name
      images {
        id
        width
        height
        type
        totalBytes
        path
        isOriginal
        url
      }
    }
  }
`;

/**
 * __useGetBannerImagesQuery__
 *
 * To run a query within a React component, call `useGetBannerImagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBannerImagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBannerImagesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBannerImagesQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetBannerImagesQuery,
    GetBannerImagesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetBannerImagesQuery, GetBannerImagesQueryVariables>(
    GetBannerImagesDocument,
    options,
  );
}
export function useGetBannerImagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetBannerImagesQuery,
    GetBannerImagesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetBannerImagesQuery,
    GetBannerImagesQueryVariables
  >(GetBannerImagesDocument, options);
}
export type GetBannerImagesQueryHookResult = ReturnType<
  typeof useGetBannerImagesQuery
>;
export type GetBannerImagesLazyQueryHookResult = ReturnType<
  typeof useGetBannerImagesLazyQuery
>;
export type GetBannerImagesQueryResult = Apollo.QueryResult<
  GetBannerImagesQuery,
  GetBannerImagesQueryVariables
>;
export const UpdateBannerDocument = gql`
  mutation UpdateBanner($id: ID!, $name: String!, $alternativeText: String!) {
    updateBanner(
      data: { id: $id, name: $name, alternativeText: $alternativeText }
    ) {
      id
      name
      alternativeText
      updatedAt
    }
  }
`;
export type UpdateBannerMutationFn = Apollo.MutationFunction<
  UpdateBannerMutation,
  UpdateBannerMutationVariables
>;

/**
 * __useUpdateBannerMutation__
 *
 * To run a mutation, you first call `useUpdateBannerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBannerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBannerMutation, { data, loading, error }] = useUpdateBannerMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      alternativeText: // value for 'alternativeText'
 *   },
 * });
 */
export function useUpdateBannerMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateBannerMutation,
    UpdateBannerMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateBannerMutation,
    UpdateBannerMutationVariables
  >(UpdateBannerDocument, options);
}
export type UpdateBannerMutationHookResult = ReturnType<
  typeof useUpdateBannerMutation
>;
export type UpdateBannerMutationResult =
  Apollo.MutationResult<UpdateBannerMutation>;
export type UpdateBannerMutationOptions = Apollo.BaseMutationOptions<
  UpdateBannerMutation,
  UpdateBannerMutationVariables
>;
export const UploadBannerImageDocument = gql`
  mutation UploadBannerImage($id: ID!, $image: Upload!) {
    uploadBannerImage(data: { id: $id, image: $image })
  }
`;
export type UploadBannerImageMutationFn = Apollo.MutationFunction<
  UploadBannerImageMutation,
  UploadBannerImageMutationVariables
>;

/**
 * __useUploadBannerImageMutation__
 *
 * To run a mutation, you first call `useUploadBannerImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadBannerImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadBannerImageMutation, { data, loading, error }] = useUploadBannerImageMutation({
 *   variables: {
 *      id: // value for 'id'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useUploadBannerImageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UploadBannerImageMutation,
    UploadBannerImageMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UploadBannerImageMutation,
    UploadBannerImageMutationVariables
  >(UploadBannerImageDocument, options);
}
export type UploadBannerImageMutationHookResult = ReturnType<
  typeof useUploadBannerImageMutation
>;
export type UploadBannerImageMutationResult =
  Apollo.MutationResult<UploadBannerImageMutation>;
export type UploadBannerImageMutationOptions = Apollo.BaseMutationOptions<
  UploadBannerImageMutation,
  UploadBannerImageMutationVariables
>;
export const GetTasksDocument = gql`
  query GetTasks($shopId: ID!) {
    tasks(shopId: $shopId) {
      id
      draft
      enabled
    }
  }
`;

/**
 * __useGetTasksQuery__
 *
 * To run a query within a React component, call `useGetTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTasksQuery({
 *   variables: {
 *      shopId: // value for 'shopId'
 *   },
 * });
 */
export function useGetTasksQuery(
  baseOptions: Apollo.QueryHookOptions<GetTasksQuery, GetTasksQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetTasksQuery, GetTasksQueryVariables>(
    GetTasksDocument,
    options,
  );
}
export function useGetTasksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTasksQuery,
    GetTasksQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetTasksQuery, GetTasksQueryVariables>(
    GetTasksDocument,
    options,
  );
}
export type GetTasksQueryHookResult = ReturnType<typeof useGetTasksQuery>;
export type GetTasksLazyQueryHookResult = ReturnType<
  typeof useGetTasksLazyQuery
>;
export type GetTasksQueryResult = Apollo.QueryResult<
  GetTasksQuery,
  GetTasksQueryVariables
>;
