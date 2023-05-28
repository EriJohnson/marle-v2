import { ComponentStyleConfig } from '@chakra-ui/react';

const button: ComponentStyleConfig = {
  defaultProps: {
    colorScheme: 'primary',
  },
  variants: {
    solid: {
      color: 'secondary',
    },
  },
};

export default button;
