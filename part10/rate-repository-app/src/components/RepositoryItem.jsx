import { View, Image, StyleSheet } from 'react-native';
import React from 'react';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 20,
    justifyContent: 'space-between',
    rowGap: 15,
    backgroundColor: 'white',
  },

  footerItemContainer: {
    display: 'flex',
    alignItems: 'center',
    rowGap: 2,
  },
  contentContainer: {
    display: 'flex',
    rowGap: 8,
    flex: 1,
  },

  languageStyle: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    color: 'white',
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 20,
  },
});

// eslint-disable-next-line no-undef
const formatter = Intl.NumberFormat('en', {
  notation: 'compact',
  maximumSignificantDigits: 3,
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Image
          style={styles.logo}
          source={{
            uri: `${item.ownerAvatarUrl}`,
          }}
        />
        <View style={styles.contentContainer}>
          <Text fontSize="heading" fontWeight="bold">
            {item.fullName}
          </Text>
          <Text fontSize="subheading" color="textSecondary">
            {item.description}
          </Text>
          <Text style={styles.languageStyle}>{item.language}</Text>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <View style={styles.footerItemContainer}>
          <Text fontWeight="bold">
            {formatter.format(item.stargazersCount)}
          </Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.footerItemContainer}>
          <Text fontWeight="bold">{formatter.format(item.forksCount)}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.footerItemContainer}>
          <Text fontWeight="bold">{formatter.format(item.reviewCount)}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.footerItemContainer}>
          <Text fontWeight="bold">{formatter.format(item.ratingAverage)}</Text>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
