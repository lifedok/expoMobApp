import { StyleProp } from '@tamagui/web';
import React, { CSSProperties, ReactElement } from 'react';
import { ViewStyle } from 'react-native';
import { Button as TButton, ButtonProps } from 'tamagui';

import colors from '~/app/consts/colors';

export default function Button(props: ButtonProps): ReactElement {
  return (
    <TButton
      size="$5"
      m="$2"
      h="$5"
      maxWidth="$15"
      w="100%"
      fontSize="$5"
      style={props.disabled ? BgColorDisabled : BgColorDefault}
      pressStyle={{
        bg: colors.buttonBgColorOptional,
        o: 0.7,
      }}
      {...props}
    />
  );
}

const BgColorDefault: StyleProp<ViewStyle | CSSProperties | (CSSProperties & ViewStyle)> = {
  backgroundColor: colors.buttonBgColor,
  color: colors.buttonTextColor,
};

const BgColorDisabled: StyleProp<ViewStyle | CSSProperties | (CSSProperties & ViewStyle)> = {
  ...BgColorDefault,
  opacity: 0.4,
};
