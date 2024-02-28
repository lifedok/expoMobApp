import { onAuthStateChanged, User } from '@firebase/auth';
import NetInfo, { NetInfoState, NetInfoStateType } from '@react-native-community/netinfo';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Slot, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { TamaguiProvider, Theme, YStack } from 'tamagui';

import config from '../tamagui.config';

import GlobalHandlerBar from '~/app/components/global-handler-bar/global-handler-bar';
import SplashAnimation from '~/app/components/splash-animation/splash-animation';
import { useAppDispatch } from '~/app/hooks';
import { store } from '~/app/store';
import { addStatusInfo } from '~/app/store/reducer/user/user-slice';
import { useGetUserSelector } from '~/app/store/selectors';
import { EPathRouteScreen } from '~/app/types/enums/route.enum';
import { ETextStatus } from '~/app/types/interfaces/global-text-info';
import { firebaseAuth } from '~/app/utils/firebase';
import { queryClient } from '~/queryClient';

const InitialLayout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const { statusInfo } = useGetUserSelector();

  const handleNetworkChange = (state: NetInfoState) => {
    if (!state.isConnected) {
      dispatch(addStatusInfo({ text: 'Check your connection', status: ETextStatus.WARNING }));
    } else if (state.type === NetInfoStateType.unknown) {
      dispatch(
        addStatusInfo({ text: 'Your connection is not stable', status: ETextStatus.WARNING })
      );
    }
  };

  useEffect(() => {
    const netInfoSubscription = NetInfo.addEventListener((state) => handleNetworkChange(state));
    return () => {
      netInfoSubscription && netInfoSubscription();
    };
  }, []);

  useEffect(() => {
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
    <Theme name="light">
      <YStack flex={1} position="relative">
        {!!statusInfo.text && <GlobalHandlerBar {...statusInfo} />}
        <Slot />
      </YStack>
    </Theme>
  );
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appReady, setAppReady] = useState<boolean>(false);
  const [splashAnimation, setSplashAnimation] = useState<boolean>(false);

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      setAppReady(true);
    }
  }, [loaded]);

  if (!appReady || !splashAnimation) {
    return (
      <SplashAnimation
        onAnimationFinish={(isCancelLed) => {
          if (!isCancelLed) setSplashAnimation(true);
        }}
      />
    );
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
