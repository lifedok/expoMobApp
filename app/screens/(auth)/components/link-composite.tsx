import { Href, Link } from 'expo-router';
import { ReactElement } from 'react';
import { SizableText, YStack, styled } from 'tamagui';

import { PressLink } from './press-link';

interface ILink {
  activeText: string;
  pathname: Href<string>;
  text?: string;
  isFlexEnd?: boolean;
}

export default function LinkComposite(props: ILink): ReactElement {
  const { text, activeText, pathname, isFlexEnd } = props;
  return (
    <Wrapper justifyContent={isFlexEnd ? 'flex-end' : 'center'}>
      <SizableText fontSize="$3">{text}</SizableText>
      <Link href={{ pathname }} asChild>
        <PressLink>{activeText}</PressLink>
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
