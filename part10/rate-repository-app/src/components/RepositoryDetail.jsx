import { useQuery } from '@apollo/client';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import * as Linking from 'expo-linking';
import theme from '../theme';
import ReviewItem from './ReviewItem';

export const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: theme.colors.mainBackground,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: 20,
    columnGap: 15,
    backgroundColor: 'white',
  },
  reviewBadge: {
    width: 60,
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.colors.primary,
    borderRadius: 100,
    borderWidth: 2,
    marginRight: 10,
  },
  contentContainer: {
    display: 'flex',
    rowGap: 8,
    flex: 1,
  },
  ratingStyle: {
    color: theme.colors.primary,
  },
  separator: {
    height: 10,
  },
});

const RepositoryInfo = ({ repository }) => {
  return (
    <View style={{ marginBottom: 10 }}>
      <RepositoryItem
        item={repository}
        showOpen={true}
        handleOpen={() => {
          Linking.openURL(repository.url);
        }}
      />
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryDetail = () => {
  const params = useParams();

  const { data, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: {
      first: 2,
      repositoryId: params.repoId,
    },
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    console.log('--- fetching more ---');

    fetchMore({
      variables: {
        repositoryId: params.repoId,
        after: data.repository.reviews.pageInfo.endCursor,
      },
    });
  };

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const reviewNodes = data.repository
    ? data.repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={reviewNodes}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={() => (
          <RepositoryInfo repository={data.repository} />
        )}
        onEndReached={handleFetchMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default RepositoryDetail;
