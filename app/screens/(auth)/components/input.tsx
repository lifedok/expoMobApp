import React, { ReactElement } from 'react';
import { styled, Input as TInput, InputProps, Text, YStack } from 'tamagui';

import colors from '~/app/consts/colors';

export interface IInput extends InputProps {
  errorText?: string;
}

export default function Input(props: IInput): ReactElement {
  const { errorText, ...restProps } = props;
  return (
    <Wrapper>
      <InputStyles mb="$0" autoCapitalize="none" {...restProps} />
      {errorText ? <TextContainer>{errorText}</TextContainer> : null}
    </Wrapper>
  );
}

const Wrapper = styled(YStack, {
  width: '100%',
  mb: '$2',
});
export const InputStyles = styled(TInput, {
  w: '100%',
  h: '$4',
  m: '$0',
  borderColor: colors.inputBorderColor,
  color: colors.inputTextColor,
});

const TextContainer = styled(Text, {
  fontSize: 12,
  color: colors.textColorError,
});
