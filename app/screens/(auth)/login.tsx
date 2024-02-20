import { signInWithEmailAndPassword } from '@firebase/auth';
import { Formik, Form, Field, FormikProps } from 'formik';
import { useState } from 'react';
import { Alert, GestureResponderEvent, NativeSyntheticEvent, TextInputFocusEventData } from "react-native";
import { YStack, Text, Button } from 'tamagui';
import * as Yup from 'yup';

import { useAppDispatch } from '~/app/hooks';
import {
  Label,
  Input,
  Title,
  LinkComposite,
  Wrapper,
  InputSecure,
} from '~/app/screens/(auth)/components';
import { setErrorText, userLogin } from '~/app/store/reducer/user/user-slice';
import { useGetUserSelector } from '~/app/store/selectors';
import { EPathRouteScreen } from '~/app/types/enums/route.enum';
import { firebaseAuth } from '~/app/utils/firebase';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Please enter your email'),
  password: Yup.string()
    .min(6, 'The field must contain more than 6 characters')
    .max(32, 'Too long, no more than 32')
    .required('The field is required'),
});
export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [hasErrors, setErrors] = useState<boolean>(true);
  // const [errorText, setErrorText] = useState<string>('');
  const dispatch = useAppDispatch();
  const { errorText } = useGetUserSelector();

  const isFormError = (): boolean => {
    let isError: boolean = false;
    if (email?.length) {
      if (!email.includes('@')) {
        dispatch(setErrorText('Invalid email'));
        isError = true;
      } else if (email.indexOf(' ') != -1) {
        dispatch(setErrorText('Email can not contain spaces'));
        isError = true;
      }
    }
    if (password?.length) {
      if (password.length < 6) {
        dispatch(setErrorText('Password should be more then 6 charters'));
        isError = true;
      } else if (password.indexOf(' ') != -1) {
        dispatch(setErrorText('Password can not contain spaces'));
        isError = true;
      }
    }
    return isError;
  };

  const onSubmit = () => {
    console.log('onSubmit');
    const formIsValid = isFormError();
    if (!formIsValid) {
      firebaseSignIn();
    }
  };

  const firebaseSignIn = async () => {
    setLoading(true);
    setErrors(false);

    await signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(() => {
        dispatch(userLogin({ email }));
        console.log('success', firebaseAuth.currentUser?.email);
      })
      .catch((error) => {
        alert(error.message);
        dispatch(setErrorText(error.message));
        setErrors(true);
      }) //lifedok@gmail.com
      .finally(() => {
        setLoading(false);
      });
  };

  console.log('email', email);
  console.log('password', password);

  return (
    <Wrapper>
      <Title>Login</Title>
      {errorText && <Title>{errorText}</Title>}

      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          Alert.alert(JSON.stringify(values));
        }}>
        {({
          errors,
          values,
          handleChange,
          isValid,
          handleSubmit,
          setFieldTouched,
          touched,
        }): JSX.Element => (
          <YStack width="100%">
            <Label>Email</Label>
            <Input
              placeholder="Enter your email"
              value={values.email}
              autoCapitalize="none"
              onChangeText={handleChange('email')}
              onBlur={(e: NativeSyntheticEvent<TextInputFocusEventData>) =>
                setFieldTouched('email')
              }
              {...(errors.email &&
                touched.email && {
                  errorText: errors.email,
                })}
            />
            {errors.email && touched.email ? <Text>{errors.email}</Text> : null}

            <Label>Password</Label>
            <InputSecure
              placeholder="Enter your password"
              value={values.password}
              autoCapitalize="none"
              {...(errors.password &&
                touched.password && {
                  errorText: errors.password,
                })}
              errorText={errors.password}
              onChangeText={handleChange('password')}
              onBlur={(e: NativeSyntheticEvent<TextInputFocusEventData>) =>
                setFieldTouched('password')
              }
            />

            <LinkComposite
              isFlexEnd
              activeText="Forgot password"
              pathname={EPathRouteScreen.FORGOT}
            />

            <Button
              mt="$8"
              onPress={(e: GestureResponderEvent) => handleSubmit()}
              disabled={!isValid || !values.email || !values.password}
              width="100%"
              style={{
                backgroundColor: isValid ? 'green' : 'red',
                pointerEvents: isValid ? 'auto' : 'none',
              }}>
              {hasErrors || !isLoading ? 'Login' : 'Logging'}
            </Button>
          </YStack>
        )}
      </Formik>

      <LinkComposite
        text={"Don't have an Account?"}
        activeText="Sign up"
        pathname={EPathRouteScreen.REGISTER}
      />
    </Wrapper>
  );
}
