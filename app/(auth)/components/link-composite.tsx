import { Link } from 'expo-router';
import { ReactElement } from 'react';
import { SizableText, YStack as TYStack, styled } from 'tamagui';

import { Button } from '~/app/(auth)/components/button';

interface ILink {
  activeText: string;
  pathname: string;
  text?: string;
  isFlexEnd?: boolean;
}

export default function LinkComposite(props: ILink): ReactElement {
  const { text, activeText, pathname, isFlexEnd } = props;
  return (
    <YStack justifyContent={isFlexEnd ? 'flex-end' : 'center'}>
      <SizableText fontSize="$3">{text}</SizableText>
      <Link href={{ pathname }} asChild>
        <Button type="link">{activeText}</Button>
      </Link>
    </YStack>
  );
}

const YStack = styled(TYStack, {
  w: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,
});
