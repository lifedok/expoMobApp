import { onAuthStateChanged, User } from '@firebase/auth';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Slot, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { TamaguiProvider, Theme, YStack, Text } from 'tamagui';
import * as SplashScreen from 'expo-splash-screen';

import config from '../tamagui.config';

import { store } from '~/app/store';
import { useGetUserSelector } from "~/app/store/selectors";
import { EPathRouteScreen } from '~/app/types/enums/route.enum';
import { firebaseAuth } from '~/app/utils/firebase';
import { queryClient } from '~/queryClient';
import InfoBar from "~/app/components/info-bar/info-bar";
import { addStatusInfo } from "~/app/store/reducer/user/user-slice";
import { ETextStatus } from "~/app/types/interfaces/global-text-info";
import { useAppDispatch } from "~/app/hooks";

const InitialLayout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const { statusInfo } = useGetUserSelector();

  useEffect(() => {
    dispatch(addStatusInfo({text: '', status: ETextStatus.SUCCESS}))
    onAuthStateChanged(firebaseAuth, (user) => {
      setFirebaseUser(user);
    });
  }, []);

  useEffect(() => {
    router.replace(
      firebaseUser ? (EPathRouteScreen.HOME as never) : (EPathRouteScreen.LOGIN as never)
    );
  }, [firebaseUser]);

  return (
    <Theme name={'light'}>
      <YStack flex={1} position={'relative'}>
        {!!statusInfo.text && <InfoBar {...statusInfo}/>}
        <Slot />
      </YStack>
    </Theme>
  );
};


export default function RootLayout() {
  SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync, 2000);

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
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <InitialLayout />
          </Provider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </TamaguiProvider>
  );
}
