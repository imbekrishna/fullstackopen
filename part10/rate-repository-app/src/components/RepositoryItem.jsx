import { View, Text } from 'react-native';
import React from 'react';

const RepositoryItem = ({ item }) => {

  console.log(item);
  return (
    <View>
      <Text>{item.fullName}</Text>
      <Text>{item.description}</Text>
      <Text>{item.language}</Text>
      <Text>{item.forksCount}</Text>
      <Text>{item.stargazersCount}</Text>
      <Text>{item.ratingAverage}</Text>
      <Text>{item.reviewCount}</Text>
      <Text>{item.ownerAvatarUrl}</Text>
    </View>
  );
};

export default RepositoryItem;
