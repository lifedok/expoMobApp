import { createUserWithEmailAndPassword } from '@firebase/auth';
import { useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import { Keyboard } from 'react-native'
import { useAppDispatch } from '~/app/hooks';
import {
  Button,
  Input,
  InputSecure,
  Label,
  LinkComposite,
  Title,
  Wrapper,
} from '~/app/screens/(auth)/components';
import { SignInFormType } from '~/app/types/auth-form.type';
import { EPathRouteScreen } from '~/app/types/enums/route.enum';
import { firebaseAuth } from '~/app/utils/firebase';
import { emailRules, passwordRules, usernameRules } from "~/app/utils/patterns";
import { addStatusInfo, setUserLogin } from "~/app/store/reducer/user/user-slice";
import { AuthDataType } from "~/app/store/reducer/user/user-slice.type";
import { ETextStatus } from "~/app/types/interfaces/global-text-info";

export default function Register() {
  const dispatch = useAppDispatch();
  const [isFbLoading, setFbLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isValid },
  } = useForm<SignInFormType>({
    mode: 'onBlur',
    defaultValues: { username: '', email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = (data: SignInFormType) => {
    reset({password: "", confirmPassword: ""});
    createAccount(data);
  };

  const createAccount = async (data: SignInFormType) => {
    setFbLoading(true);
    dispatch(addStatusInfo({text: ''}))

    const { username, email, password } = data;

    await createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then(() => {
        const userAuth: AuthDataType = { email: email, username: username };
        dispatch(setUserLogin(userAuth));
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
      <Title>Register</Title>

      <Controller
        control={control}
        name="username"
        rules={usernameRules<SignInFormType>()}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <Label>Username</Label>
            <Input
              textContentType={'username'}
              placeholder="Enter your username"
              autoCapitalize='words'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              {...(error?.message && { errorText: error.message })}
            />
          </>
        )}
      />

      <Controller
        control={control}
        name="email"
        rules={emailRules<SignInFormType>()}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <Label>Email</Label>
            <Input
              textContentType={'emailAddress'}
              placeholder="Enter your Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              {...(error?.message && { errorText: error.message })}
            />
          </>
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={passwordRules<SignInFormType>()}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <Label>Password</Label>
            <InputSecure
              textContentType={'password'}
              placeholder="Enter your password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              {...(error?.message && { errorText: error.message })}
            />
          </>
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        rules={{
          ...passwordRules<SignInFormType>(),
          validate: (val: string) => {
            if (watch('password') != val) {
              return "Your passwords do no match";
            }
          }
        }}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <Label>Confirm password</Label>
            <InputSecure
              placeholder="Confirm password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              {...(error?.message && { errorText: error.message })}
            />
          </>
        )}
      />

      <Button mt="$8" onPress={handleSubmit(onSubmit)} disabled={!isValid}>
        {`Creat${!isFbLoading ? 'e' : 'ing'} account`}
      </Button>

      <LinkComposite
        text="Have an account?"
        activeText="Sign in"
        pathname={EPathRouteScreen.LOGIN}
      />
    </Wrapper>
  );
}
