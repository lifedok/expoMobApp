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
import { ForgotFormType } from '~/app/types/auth-form.type';
import { EPathRouteScreen } from '~/app/types/enums/route.enum';
import { firebaseAuth } from '~/app/utils/firebase';
import { emailRules } from '~/app/utils/patterns';
import { addStatusInfo } from "~/app/store/reducer/user/user-slice";
import { ETextStatus } from "~/app/types/interfaces/global-text-info";
import { useAppDispatch } from "~/app/hooks";

export default function Forgot() {
  const dispatch = useAppDispatch();
  const [isFbLoading, setFbLoading] = useState<boolean>(false);
  const [isResetLink, setResetLink] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isLoading, isValid },
  } = useForm<ForgotFormType>({ mode: 'onBlur', defaultValues: { email: '' } });
  const onSubmit = (data: ForgotFormType) => {
    reset();
    handleResetPassword(data);
  };

  const handleResetPassword = async (data: ForgotFormType) => {
    setFbLoading(true);
    dispatch(addStatusInfo({text: ''}))

    const { email } = data;
    await sendPasswordResetEmail(firebaseAuth, email)
      .then(() => {
        setResetLink(true);
      })
      .catch((error) => {
        dispatch(addStatusInfo({text: error.message, status: ETextStatus.ERROR}))
      })
      .finally(() => {
        setFbLoading(false);
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
            rules={emailRules<ForgotFormType>()}
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
          <Button onPress={handleSubmit(onSubmit)} mt="$8">
            {`Reset${!isFbLoading ? '' : 'ing'} password`}
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
