import { onAuthStateChanged } from '@firebase/auth';
import { useFonts } from 'expo-font';
import { Slot, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TamaguiProvider, Theme } from 'tamagui';

import config from '../tamagui.config';

import { firebaseAuth } from '~/utils/firebase';

const InitialLayout = () => {
  const [user, serUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      console.log('user', user);
      serUser(user as any); //TODO: any
    });
  }, []);

  useEffect(() => {
    router.replace(user ? '/(drawer)/(tabs)/home' : '/(auth)/login');
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
