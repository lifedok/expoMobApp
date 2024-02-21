import { styled, TextProps, Text, YStack } from "tamagui";
import React, { ReactElement, useEffect, useState } from "react";
import { colorTokens } from "@tamagui/themes";

interface IInfoBar extends Omit<TextProps, "children"> {
  text: string
  status?: 'success' | 'error',
}
export default function InfoBar(props: IInfoBar): ReactElement | null {
  const {text, status, ...restProps} = props;
  const [visible, setVisible] = useState<boolean>(false)

  useEffect(() => {
    setVisible(true)
    const timer = setTimeout(() => {
      setVisible(false)
    }, 5000);
    return () => clearTimeout(timer);
  }, [text])

  return (
    visible ?
    <Wrapper>
      <TextStyle {...restProps}>{text}</TextStyle>
    </Wrapper> : null
  );
}

const Wrapper = styled(YStack, {
  position: 'absolute',
  w: '100%',
  left: 0,
  top: 0,
  right: 0,
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  borderRadius: 16,
  bg: colorTokens.light.red.red9,
  p: '$2',
});

const TextStyle = styled(Text, {
  color: 'white',
  fontWeight: '500'
});
