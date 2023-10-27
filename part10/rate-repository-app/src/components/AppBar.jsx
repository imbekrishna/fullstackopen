import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';
import { Link, useNavigate } from 'react-router-native';
import { useApolloClient, useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.background,
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
  },
  tabStyle: {
    color: 'white',
    marginRight: 20,
  },
});

const AppBar = () => {
  const data = useQuery(GET_ME);
  const authStorage = useAuthStorage();
  const client = useApolloClient();
  const navigate = useNavigate();

  const signOut = async () => {
    await authStorage.removeAccessToken('auth:accessToken');
    client.resetStore();
    navigate('/');
  };

  if (data.loading) {
    return;
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text fontWeight="bold" fontSize="heading" style={styles.tabStyle}>
            Repositories
          </Text>
        </Link>
        {data.data.me !== null ? (
          <>
            <Link to="/review">
              <Text
                fontWeight="bold"
                fontSize="heading"
                style={styles.tabStyle}
              >
                Create a review
              </Text>
            </Link>
            <Link to="/myReviews">
              <Text
                fontWeight="bold"
                fontSize="heading"
                style={styles.tabStyle}
              >
                My reviews
              </Text>
            </Link>
            <SignOutButton signOut={signOut} />
          </>
        ) : (
          <>
            <Link to="/signin">
              <Text
                fontWeight="bold"
                fontSize="heading"
                style={styles.tabStyle}
              >
                Sign in
              </Text>
            </Link>
            <Link to="/signup">
              <Text
                fontWeight="bold"
                fontSize="heading"
                style={styles.tabStyle}
              >
                Sign up
              </Text>
            </Link>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export const SignOutButton = ({ signOut }) => {
  return (
    <Pressable onPress={signOut}>
      <Text fontWeight="bold" fontSize="heading" style={styles.tabStyle}>
        Sign Out
      </Text>
    </Pressable>
  );
};

export default AppBar;
