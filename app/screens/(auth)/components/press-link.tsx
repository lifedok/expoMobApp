import { colorTokens } from '@tamagui/themes';
import { styled, Text } from 'tamagui';

export const PressLink = styled(Text, {
  fontSize: '$3',
  w: 'auto',
  h: 'auto',
  pl: '$1',
  pr: '$1',
  br: '$4',
  color: colorTokens.light.blue.blue12,
  pressStyle: {
    opacity: 0.7,
  },
});
