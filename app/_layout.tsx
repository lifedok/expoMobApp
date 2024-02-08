import { onAuthStateChanged, User } from '@firebase/auth';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Slot, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { TamaguiProvider, Theme } from 'tamagui';

import { requireAuthorization, setUser as setCustomUser } from './store/reducer/user-process';
import config from '../tamagui.config';

import { useAppDispatch } from '~/app/hooks';
import { store } from '~/app/store';
import { useGetUiSelector, useGetUserSelector } from '~/app/store/selectors';
import { AuthorizationStatus, EPathRouteScreen } from '~/app/types/enums/route.enum';
import { firebaseAuth } from '~/app/utils/firebase';
import { queryClient } from '~/queryClient';

const InitialLayout = () => {
  const router = useRouter();
  const { user } = useGetUserSelector();
  const dispatch = useAppDispatch();
  const [authUser, setUser] = useState<User | null>(null);

  const { theme } = useGetUiSelector();

  // TODO: user - firstly, get user token and after then redirect to firebaseAuth or to home screen (if token is success)
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user);
      dispatch(setCustomUser(user));
      dispatch(requireAuthorization(AuthorizationStatus.AUTH));
    });
  }, []);

  useEffect(() => {
    // router.replace(EPathRouteScreen.START as any); // TODO
    // setTimeout(() => {
    router.replace(user ? (EPathRouteScreen.HOME as never) : (EPathRouteScreen.LOGIN as never));
    // }, 3000);
  }, [user]);

  console.log('authUser', authUser);
  console.log('setCustomUser', user);

  return (
    <Theme name={theme}>
      <Slot />
    </Theme>
  );
};

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={config} defaultTheme="light">
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <InitialLayout />
          </QueryClientProvider>
        </Provider>
      </GestureHandlerRootView>
    </TamaguiProvider>
  );
}
