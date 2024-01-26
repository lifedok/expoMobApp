import { styled, Button as TButton } from 'tamagui';

export const Button = styled(TButton, {
  w: '100%',
  h: '$5',
  m: '$2',
  maxWidth: '$15',

  variants: {
    type: {
      normal: {
        bg: '$green5',
        color: '$green12',
        fontSize: '$5',
        pressStyle: {
          bg: '$green7',
          color: '$green1',
        },
      },
      outline: {
        borderWidth: '$1',
        borderColor: '$green8',
        color: '$green12',
        pressStyle: {
          bg: 'transparent',
        },
      },
      link: {
        fontSize: '$3',
        w: 'auto',
        h: 'auto',
        m: '$0',
        p: '$0',
        pl: '$1',
        pr: '$1',
        br: '$0',
        color: '$blue12',
        bg: 'transparent',
        borderBottomWidth: '$1',
        borderStyle: 'solid',
        borderBottomColor: '$blue12',
        pressStyle: {
          bg: 'transparent',
          borderColor: 'transparent',
          borderBottomColor: '$blue11',
        },
      },
    },
  } as const,

  defaultVariants: {
    type: 'normal',
  },
});
