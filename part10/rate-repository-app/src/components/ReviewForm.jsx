import { Formik } from 'formik';
import { Text, View, StyleSheet } from 'react-native';
import Button from './Button';
import FormikInput from './FormikTextInput';

import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';
import { CREATE_REVIEW } from '../graphql/mutations';
import theme from '../theme';

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: theme.colors.formBackground,
    padding: 20,
  },

  alertStyle: {
    textAlign: 'center',
    marginBottom: 10,
    color: theme.colors.error,
  },
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validaionSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating cannot be negative')
    .required('Rating is required')
    .min(0, 'Minimum rating can be 0')
    .max(100, 'Maximum rating can be 100'),
  text: yup.string().optional(),
});

const ReviewForm = ({ onSubmit }) => {
  return (
    <View>
      <Formik
        initialValues={initialValues}
        validationSchema={validaionSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <View style={{ display: 'flex', rowGap: 10 }}>
            <FormikInput name="ownerName" placeholder="Repository owner name" />
            <FormikInput name="repositoryName" placeholder="Repository name" />
            <FormikInput
              name="rating"
              placeholder="Rating between 0 to 100"
              keyboardType="numeric"
            />
            <FormikInput name="text" placeholder="Review" multiline />
            <Button handleSubmit={handleSubmit} title="Create a review" />
          </View>
        )}
      </Formik>
    </View>
  );
};

const ReviewFormContainer = () => {
  const [mutate] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const onSubmit = async (values) => {
    try {
      const { data } = await mutate({
        variables: {
          review: {
            ownerName: values.ownerName,
            rating: Number(values.rating),
            repositoryName: values.repositoryName,
            text: values.text,
          },
        },
      });
      const repoId = data.createReview.repositoryId;
      navigate(`/${repoId}`);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }

    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  return (
    <View style={styles.formContainer}>
      {error && <Text style={styles.alertStyle}>{error}</Text>}
      <ReviewForm onSubmit={onSubmit} />
    </View>
  );
};

export default ReviewFormContainer;
