import { Platform } from 'react-native';

function getFont() {
  switch (Platform.OS) {
    case 'android':
      return 'Roboto';
    case 'ios':
      return 'Arial';
    default:
      return 'System';
  }
}

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    background: '#24292e',
    mainBackground: '#e1e4e8',
    error: '#d73a4a',
    formBackground: "#ffffff"
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    heading: 18,
    title: 24,
  },
  fonts: {
    main: getFont(),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;
