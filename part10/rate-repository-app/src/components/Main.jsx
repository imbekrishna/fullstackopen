import { Pressable, StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#e1e4e8',
  },
});

const Main = () => {
  return (
    <View style={styles.mainContainer}>
      <Pressable>
        <AppBar />
      </Pressable>
      <RepositoryList />
    </View>
  );
};

export default Main;
