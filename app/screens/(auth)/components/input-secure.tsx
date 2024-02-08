import { Ionicons } from '@expo/vector-icons';
import React, { ReactElement } from 'react';
import { InputProps, styled, YStack } from 'tamagui';

import { Input } from './input';

interface IInputSecure extends InputProps {}

export default function InputSecure(props: IInputSecure): ReactElement {
  const [isSecureText, setSecureText] = React.useState<boolean>(true);
  return (
    <Wrapper>
      <Input {...props} secureTextEntry={isSecureText} mb="$0" />
      <IconContainer>
        <Ionicons
          name={isSecureText ? 'eye-off' : 'eye'}
          size={24}
          onPress={() => setSecureText(!isSecureText)}
        />
      </IconContainer>
    </Wrapper>
  );
}
const Wrapper = styled(YStack, {
  position: 'relative',
  width: '100%',
  mb: '$2',
});

const IconContainer = styled(YStack, {
  position: 'absolute',
  right: 6,
  paddingHorizontal: 6,
  paddingVertical: 4,
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
});
