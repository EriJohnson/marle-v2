import { ComponentStyleConfig } from '@chakra-ui/react';

const input: ComponentStyleConfig = {
  baseStyle: {
    field: {
      borderRadius: 'md',
    },
  },

  defaultProps: {
    focusBorderColor: 'secondary',
    size: 'sm',
  },

  sizes: {
    sm: {
      field: {
        borderRadius: 'md',
      },
    },
  },
};

export default input;
