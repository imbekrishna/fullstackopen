import { gql } from '@apollo/client';
import { REPOSITORY_DETAILS, REVIEW_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          ...RepositoryDetails
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }

  ${REPOSITORY_DETAILS}
`;

export const GET_REPOSITORY = gql`
  query GetRepository($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      ...RepositoryDetails
      url
      reviews(first: $first, after: $after) {
        ...ReviewDetails
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
      }
    }
  }
  ${REVIEW_DETAILS}
  ${REPOSITORY_DETAILS}
`;

export const GET_ME = gql`
  query ($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        ...ReviewDetails
      }
    }
  }
  ${REVIEW_DETAILS}
`;
