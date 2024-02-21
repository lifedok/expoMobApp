import { onAuthStateChanged, User } from '@firebase/auth';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Slot, useRouter, SplashScreen } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { TamaguiProvider, Theme } from 'tamagui';

import config from '../tamagui.config';

import { store } from '~/app/store';
import { useGetUiSelector } from '~/app/store/selectors';
import { EPathRouteScreen } from '~/app/types/enums/route.enum';
import { firebaseAuth } from '~/app/utils/firebase';
import { queryClient } from '~/queryClient';

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const router = useRouter();
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);

  const { theme } = useGetUiSelector();

  // TODO: user - firstly, get user token and after then redirect to firebaseAuth or to home screen (if token is success)
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      setFirebaseUser(user);
    });
  }, []);

  useEffect(() => {
    // router.replace(EPathRouteScreen.START as any); // TODO
    // setTimeout(() => {
    router.replace(
      EPathRouteScreen.LOGIN as never
      // firebaseUser ? (EPathRouteScreen.HOME as never) : (EPathRouteScreen.LOGIN as never)
    );
    // }, 3000);
  }, [firebaseUser]);

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

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;
  return (
    <TamaguiProvider config={config} defaultTheme="light">
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <InitialLayout />
          </Provider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </TamaguiProvider>
  );
}
