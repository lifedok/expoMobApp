import { Link } from 'expo-router';
import { ReactElement } from 'react';
import { SizableText, YStack, styled } from 'tamagui';

import { Button } from './button';

interface ILink {
  activeText: string;
  pathname: string;
  text?: string;
  isFlexEnd?: boolean;
}

export default function LinkComposite(props: ILink): ReactElement {
  const { text, activeText, pathname, isFlexEnd } = props;
  return (
    <Wrapper justifyContent={isFlexEnd ? 'flex-end' : 'center'}>
      <SizableText fontSize="$3">{text}</SizableText>
      {/*TODO*/}
      <Link href={{ pathname } as never} asChild>
        <Button type="link">{activeText}</Button>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled(YStack, {
  w: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,
});
