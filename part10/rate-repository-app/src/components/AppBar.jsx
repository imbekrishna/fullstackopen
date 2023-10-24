import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';
import { Link } from 'react-router-native';

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
    marginRight: 10,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text fontWeight="bold" fontSize="heading" style={styles.tabStyle}>
            Repositories
          </Text>
        </Link>
        <Link to="/signin">
          <Text fontWeight="bold" fontSize="heading" style={styles.tabStyle}>
            Sign in
          </Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
