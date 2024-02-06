import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { router, Slot } from 'expo-router';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { TamaguiProvider, Theme } from 'tamagui';

import config from '../tamagui.config';

import { useAppSelector } from '~/app/hooks';
import { store } from '~/app/store';
import { EPathRouteScreen } from '~/app/types/enums/route.enum';
import { firebaseAuth } from '~/app/utils/firebase';
import { queryClient } from '~/queryClient';

const InitialLayout = () => {
  const user = useAppSelector(({ user }) => user);
  const theme = useAppSelector(({ theme }) => theme);

  // const {user} = useSelector((state) => state[ReducerNameEnum.USER]);
  // const [authUser, setUser] = useState<UserAuth | null>(null);
  // const router = useRouter();

  // useEffect(() => {
  //   onAuthStateChanged(firebaseAuth, (user) => {
  //     console.log('user', user);
  //     setUser(user);
  //   });
  // }, []);

  console.log('theme', theme);
  useEffect(() => {
    // router.replace(EPathRouteScreen.START);

    // setTimeout(() => {
    router.replace(user ? EPathRouteScreen.HOME : EPathRouteScreen.LOGIN);
    // }, 3000)
  }, [user]);

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
