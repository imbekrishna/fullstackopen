import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    height: 100,
    backgroundColor: theme.colors.background,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Text fontWeight="bold" fontSize="heading" style={{ color: 'white' }}>
        Repositories
      </Text>
    </View>
  );
};

export default AppBar;
