import { styled, TextProps, Text, YStack } from "tamagui";
import React, { ReactElement, useEffect, useState } from "react";
import { colorTokens } from "@tamagui/themes";
import { ETextStatus, IGlobalTextInfo } from "~/app/types/interfaces/global-text-info";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface IInfoBar extends Omit<TextProps, "children">, IGlobalTextInfo {}

export default function InfoBar(props: IInfoBar): ReactElement | null {
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

  const bg = status === ETextStatus.ERROR ? colorTokens.light.red.red9 : colorTokens.light.green.green8;
  return (
    visible ?
      <Wrapper top={top}>
        <Content bg={bg}>
          <TextStyle {...restProps}>{text}</TextStyle>
        </Content>
      </Wrapper>
      : null
  );
}
const Wrapper = styled(YStack, {
  position: "absolute",
  zIndex: 100,
  w: "100%",
  left: 0,
  marginHorizontal: "auto",
  right: 0,
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden"
});

const Content = styled(YStack, {
  p: "$2",
  w: "70%",
  borderRadius: 6,
  justifyContent: "center",
  alignItems: "center"
});

const TextStyle = styled(Text, {
  color: "white",
  fontWeight: "500"
});
