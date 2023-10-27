import { View } from 'react-native';
import { Formik } from 'formik';
import FormikInput from './FormikTextInput';
import Button from './Button';

import useSignIn from '../hooks/useSignIn';

import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';

const initialValues = {
  username: '',
  password: '',
  confirmPassword: '',
};

const validaionSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(5, 'Username must be at least 5 character long')
    .max(30, 'Username cannot have length greater than 30'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must have length > 5')
    .max(50, 'Password must have length < 30'),
  confirmPassword: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const SignUpForm = ({ onSubmit }) => {
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
            <FormikInput
              name="confirmPassword"
              placeholder="Confirm Password"
              secureTextEntry={true}
            />
            <Button handleSubmit={handleSubmit} title="Sign Up" />
          </View>
        )}
      </Formik>
    </View>
  );
};

const SignUp = () => {
  const [signIn] = useSignIn();
  const [mutate] = useMutation(CREATE_USER);

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data } = await mutate({
        variables: {
          user: {
            username,
            password,
          },
        },
      });
      await signIn({ username, password });

      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return <SignUpForm onSubmit={onSubmit} />;
};

export default SignUp;
