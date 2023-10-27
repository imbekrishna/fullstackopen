import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    color: '#fff',
    alignSelf: 'center',
  },
});

const Button = ({ title, handleSubmit, props }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleSubmit}
      style={styles.appButtonContainer}
      {...props}
    >
      <Text fontSize="subheading" style={styles.appButtonText}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
