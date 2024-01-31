import { ReactElement, ReactNode } from 'react';
import { ScrollView as TScrollView, YStack as TYStack, styled } from 'tamagui';

export default function Wrapper(props: ReactNode): ReactElement {
  return (
    <YStack>
      <ScrollView>{props.children}</ScrollView>
    </YStack>
  );
}

const YStack = styled(TYStack, {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  bg: '$orange3',
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
