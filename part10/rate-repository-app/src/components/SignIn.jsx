import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';
import FormikInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';

import * as yup from 'yup';

const initialValues = {
  username: '',
  password: '',
};

const styles = StyleSheet.create({
  // ...
  appButtonContainer: {
    elevation: 8,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    height: 50,
  },
  appButtonText: {
    color: '#fff',
    alignSelf: 'center',
  },
});

const validaionSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const SignIn = () => {
  return (
    <View style={{ backgroundColor: 'white', padding: 20 }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validaionSchema}
        onSubmit={() => console.log('submitted')}
      >
        {({ handleSubmit }) => (
          <View style={{ display: 'flex', rowGap: 10 }}>
            <FormikInput name="username" placeholder="Username" />
            <FormikInput
              name="password"
              placeholder="Password"
              type="password"
              secureTextEntry={true}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleSubmit}
              style={styles.appButtonContainer}
            >
              <Text fontSize="heading" style={styles.appButtonText}>
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SignIn;
