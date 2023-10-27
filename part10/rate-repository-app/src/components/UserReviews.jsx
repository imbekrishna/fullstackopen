import { View, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import theme from '../theme';
import ReviewItem from './ReviewItem';
import { GET_ME } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import Text from './Text';

export const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: theme.colors.mainBackground,
    flex: 1,
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

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviews = () => {
  const { data, loading, refetch } = useQuery(GET_ME, {
    variables: {
      includeReviews: true,
    },
  });

  if (loading) {
    return <Text>Loading</Text>;
  }

  const reviewNodes = data.me
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={reviewNodes}
        renderItem={({ item }) => (
          <ReviewItem
            review={item}
            refetchReviews={refetch}
            showAction={true}
          />
        )}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};

export default UserReviews;
