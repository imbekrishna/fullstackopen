import { View } from 'react-native';
import { Formik } from 'formik';
import FormikInput from './FormikTextInput';
import Button from './Button';

import useSignIn from '../hooks/useSignIn';

import * as yup from 'yup';

const initialValues = {
  username: '',
  password: '',
};

const validaionSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export const SignInForm = ({ onSubmit }) => {
  return (
    <View style={{ backgroundColor: 'white', padding: 20 }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validaionSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <View style={{ display: 'flex', rowGap: 10 }}>
            <FormikInput name="username" placeholder="Username" />
            <FormikInput
              name="password"
              placeholder="Password"
              secureTextEntry={true}
            />
            <Button handleSubmit={handleSubmit} title="Sign In" />
          </View>
        )}
      </Formik>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
    } catch (error) {
      console.log(error);
    }
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
