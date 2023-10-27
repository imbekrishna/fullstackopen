import { gql } from '@apollo/client';

export const REPOSITORY_DETAILS = gql`
  fragment RepositoryDetails on Repository {
    id
    fullName
    description
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    ownerAvatarUrl
  }
`;

export const REVIEW_DETAILS = gql`
  fragment ReviewDetails on ReviewConnection {
    edges {
      node {
        id
        text
        rating
        createdAt
        user {
          id
          username
        }
        repository {
          url
        }
      }
    }
  }
`;
