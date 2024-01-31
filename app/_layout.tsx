import { onAuthStateChanged, User as UserAuth } from '@firebase/auth';
import { useFonts } from 'expo-font';
import { Slot, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TamaguiProvider, Theme } from 'tamagui';

import config from '../tamagui.config';

import { EPathRouteScreen } from '~/app/types/enums/route.enum';
import { firebaseAuth } from '~/app/utils/firebase';

const InitialLayout = () => {
  const [user, setUser] = useState<UserAuth | null>(null);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      console.log('user', user);
      setUser(user);
    });
  }, []);

  useEffect(() => {
    router.replace(user ? EPathRouteScreen.HOME : EPathRouteScreen.LOGIN);
  }, [user]);

  return <Slot />;
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
    <TamaguiProvider config={config}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Theme name="light">
          <InitialLayout />
        </Theme>
      </GestureHandlerRootView>
    </TamaguiProvider>
  );
}
