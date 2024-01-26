import { useFonts } from 'expo-font';
import { Slot, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TamaguiProvider, Theme } from 'tamagui';

import config from '../tamagui.config';

const InitialLayout = () => {
  const router = useRouter();

  useEffect(() => {
    // router.replace('/login');
    router.replace('/(auth)/login');
    // router.replace('/(drawer)/(tabs)/home');
  }, []);

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
