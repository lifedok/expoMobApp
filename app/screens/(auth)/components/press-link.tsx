import { styled, Text } from 'tamagui';

import colors from '~/app/consts/colors';

export const PressLink = styled(Text, {
  fontSize: '$3',
  w: 'auto',
  h: 'auto',
  pl: '$1',
  pr: '$1',
  br: '$4',
  color: colors.linkTextColor,
  pressStyle: {
    opacity: 0.7,
  },
});
