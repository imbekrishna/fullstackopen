import { TextInput as NativeTextInput } from 'react-native';

const TextInput = ({ style, error, ...props }) => {
  return <NativeTextInput style={style} {...props} />;
};

export default TextInput;
