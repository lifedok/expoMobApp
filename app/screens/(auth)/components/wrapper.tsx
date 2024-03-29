import { ReactElement, ReactNode } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView as TScrollView, YStack as TYStack, styled } from 'tamagui';

import colors from '~/app/consts/colors';

export default function Wrapper({ children }: { children: ReactNode }): ReactElement {
  const { top } = useSafeAreaInsets();
  return (
    <YStack paddingTop={top}>
      <ScrollView>{children}</ScrollView>
    </YStack>
  );
}

const YStack = styled(TYStack, {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  bg: colors.bgPrimary,
  position: 'relative',
});

const ScrollView = styled(TScrollView, {
  width: '70%',
  maxWidth: '$20',
  flex: 1,
  padding: '$2',
  contentContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
