import { useMutation, useApolloClient } from '@apollo/client';
import { AUTHENTICATE_USER } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';
import { useNavigate } from 'react-router-native';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE_USER);
  const authStorage = useAuthStorage();
  const navigate = useNavigate();
  const client = useApolloClient();

  const signIn = async ({ username, password }) => {
    try {
      const { data } = await mutate({
        variables: {
          credentials: { username: username, password: password },
        },
      });

      await authStorage.setAccessToken(data.authenticate.accessToken);
      navigate('/');
      client.resetStore();
    } catch (error) {
      console.log(error);
    }
  };
  return [signIn, result];
};

export default useSignIn;
