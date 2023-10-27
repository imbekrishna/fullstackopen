import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from './Text';
import { format } from 'date-fns';
import theme from '../theme';
import { Button, Dialog, Portal } from 'react-native-paper';
import * as Linking from 'expo-linking';
import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  reviewContainer: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 15,
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

  actionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    columnGap: 10,
  },
});

const ReviewItem = ({ review, refetchReviews, showAction = false }) => {
  const [mutate] = useMutation(DELETE_REVIEW);

  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleDelete = async (id) => {
    hideDialog();
    try {
      const { data } = await mutate({
        variables: {
          deleteReviewId: id,
        },
      });

      await refetchReviews({
        includeReviews: true,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.reviewContainer}>
        <View style={styles.reviewBadge}>
          <Text style={styles.ratingStyle} fontSize="heading" fontWeight="bold">
            {review.rating}
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <Text fontSize="heading" fontWeight="bold">
            {review.user.username}
          </Text>
          <Text color="textSecondary" fontSize="subheading">
            {format(Date.parse(review.createdAt), 'dd.MM.yyyy')}
          </Text>
          <Text fontSize="body">{review.text}</Text>
        </View>
      </View>
      {showAction && (
        <View style={styles.actionContainer}>
          <Button
            buttonColor={theme.colors.primary}
            style={{ borderRadius: 5, paddingVertical: 5, flex: 1 }}
            onPress={() => {
              Linking.openURL(review.repository.url);
            }}
          >
            <Text color="textWhite" fontWeight="bold">
              View Repository
            </Text>
          </Button>
          <Button
            buttonColor={theme.colors.error}
            style={{ borderRadius: 5, paddingVertical: 5, flex: 1 }}
            onPress={showDialog}
          >
            <Text color="textWhite" fontWeight="bold">
              Delete Review
            </Text>
          </Button>
          <Portal>
            <Dialog
              visible={visible}
              onDismiss={hideDialog}
              style={{
                borderRadius: 5,
                backgroundColor: theme.colors.formBackground,
              }}
            >
              <Dialog.Title>Delete Review</Dialog.Title>
              <Dialog.Content>
                <Text variant="bodyMedium">
                  Are you sure you want to delete this review?
                </Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>
                  <Text color="primary" fontWeight="bold">
                    CANCEL
                  </Text>
                </Button>
                <Button onPress={() => handleDelete(review.id)}>
                  <Text color="primary" fontWeight="bold">
                    DELETE
                  </Text>
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      )}
    </View>
  );
};

export default ReviewItem;
