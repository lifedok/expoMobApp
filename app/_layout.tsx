import { onAuthStateChanged, User } from '@firebase/auth';
import { useFonts } from 'expo-font';
import { Slot, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { TamaguiProvider, Theme } from 'tamagui';

import config from '../tamagui.config';

import { store } from '~/app/store';
import { useGetUiSelector } from '~/app/store/selectors';
import { EPathRouteScreen } from '~/app/types/enums/route.enum';
import { firebaseAuth } from '~/app/utils/firebase';

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
      EPathRouteScreen.HOME as never
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

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={config} defaultTheme="light">
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <InitialLayout />
        </Provider>
      </GestureHandlerRootView>
    </TamaguiProvider>
  );
}
