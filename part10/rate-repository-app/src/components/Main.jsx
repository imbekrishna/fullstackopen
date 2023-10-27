import { StyleSheet, View } from 'react-native';

import { Route, Routes, Navigate } from 'react-router-native';
import theme from '../theme';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import RepositoryDetail from './RepositoryDetail';
import ReviewForm from './ReviewForm';
import SignUp from './SignUp';
import UserReviews from './UserReviews';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.mainContainer}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/review" element={<ReviewForm />} />
        <Route path="/myReviews" element={<UserReviews />} />
        <Route path="/:repoId" element={<RepositoryDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
