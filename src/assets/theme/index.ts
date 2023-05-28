// theme/index.js
import { extendTheme } from '@chakra-ui/react';
import colors from './foundations/colors';
import styles from './foundations/styles';
import Button from './components/button';
import Input from './components/input';
import Link from './components/link';
import fonts from './foundations/fonts';
import fontWeights from './foundations/fontWeights';

const overrides = {
  styles,
  colors,
  fonts,
  fontWeights,
  components: {
    Button,
    Input,
    Link,
  },
};

export default extendTheme(overrides);
