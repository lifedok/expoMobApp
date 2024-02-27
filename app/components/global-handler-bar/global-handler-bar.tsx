import { colorTokens } from '@tamagui/themes';
import React, { ReactElement, useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styled, Text, TextProps, YStack } from 'tamagui';

import { ETextStatus, IGlobalHandler } from '~/app/types/interfaces/global-text-info';

interface IGlobalHandlerBar extends Omit<TextProps, 'children'>, IGlobalHandler {}

export default function GlobalHandlerBar(props: IGlobalHandlerBar): ReactElement | null {
  const { top } = useSafeAreaInsets();
  const { text, status, ...restProps } = props;
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [text]);

  const getBg = () => {
    switch (status) {
      case ETextStatus.ERROR:
        return colorTokens.light.red.red8;
      case ETextStatus.WARNING:
        return colorTokens.light.yellow.yellow8;
      case ETextStatus.SUCCESS:
        return colorTokens.light.green.green8;
      default:
        return colorTokens.light.green.green8;
    }
  };

  return visible ? (
    <Wrapper top={top}>
      <Content bg={getBg()}>
        <TextStyle {...restProps}>{text}</TextStyle>
      </Content>
    </Wrapper>
  ) : null;
}
const Wrapper = styled(YStack, {
  position: 'absolute',
  zIndex: 100,
  w: '100%',
  left: 0,
  marginHorizontal: 'auto',
  right: 0,
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
});

const Content = styled(YStack, {
  p: '$2',
  w: '70%',
  borderRadius: 6,
  justifyContent: 'center',
  alignItems: 'center',
});

const TextStyle = styled(Text, {
  color: 'white',
  fontWeight: '500',
});
