import { sendPasswordResetEmail } from '@firebase/auth';
import { router } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { YStack, H4, styled } from 'tamagui';

import {
  Label,
  Input,
  Title,
  Button,
  LinkComposite,
  Wrapper,
} from '~/app/screens/(auth)/components';
import { ForgotFormData } from '~/app/types/auth-form-data';
import { EPathRouteScreen } from '~/app/types/enums/route.enum';
import { firebaseAuth } from '~/app/utils/firebase';
import { emailRules } from '~/app/utils/patterns';

export default function Forgot() {
  const [isResetLink, setResetLink] = useState<boolean>(false);
  // const [isLoading, setLoading] = useState<boolean>(false);
  const [hasErrors, setErrors] = useState<boolean>(true);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isLoading, isValid },
  } = useForm<ForgotFormData>({ mode: 'onBlur', defaultValues: { email: '' } });
  const onSubmit = (data: ForgotFormData) => {
    reset();
    console.log(data);
    console.log('isValid', isValid);
    if (isValid) {
      handleResetPassword(data);
    }
  };

  const handleResetPassword = async (data: ForgotFormData) => {
    // setLoading(true);
    setErrors(false);

    const { email } = data;
    await sendPasswordResetEmail(firebaseAuth, email)
      .then(() => {
        // setLoading(false);
        setResetLink(true);
      })
      .catch((error) => {
        alert(error.message);
        setErrors(true);
        setResetLink(false);
      });
  };

  return (
    <Wrapper>
      <Title>Reset</Title>

      {isResetLink ? (
        <BlockResult>
          <Text>A password reset request has been sent.</Text>
          <Text>Check your email or spam folder to find password reset link</Text>
          {/*TODO*/}
          <Button onPress={() => router.replace(EPathRouteScreen.LOGIN as never)} mt="$10">
            Back to login
          </Button>
        </BlockResult>
      ) : (
        <BlockInput>
          <Controller
            control={control}
            name="email"
            rules={emailRules<ForgotFormData>()}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <>
                <Label>Email</Label>
                <Input
                  placeholder="Enter your email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  {...(error?.message && { errorText: error.message })}
                />
              </>
            )}
          />
          <Button onPress={handleSubmit(onSubmit)} disabled={!isValid} mt="$8">
            {`Reset${hasErrors || !isLoading ? '' : 'ing'} password`}
          </Button>
          <LinkComposite activeText="Back to login" pathname={EPathRouteScreen.LOGIN} />
        </BlockInput>
      )}
    </Wrapper>
  );
}

const Text = styled(H4, {
  textAlign: 'center',
  mt: '$5',
});

const BlockInput = styled(YStack, {
  alignItems: 'center',
  width: '100%',
});

const BlockResult = styled(YStack, {
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
});
