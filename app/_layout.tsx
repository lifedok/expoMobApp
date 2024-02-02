import { onAuthStateChanged, User as UserAuth } from "@firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { router, Slot, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider, useSelector } from "react-redux";
import { TamaguiProvider, Theme } from "tamagui";

import config from "../tamagui.config";

import { useAppSelector } from "~/app/hooks";
import { store } from "~/app/store";
import { useGetUser } from "~/app/store/selectors";
import { ReducerNameEnum } from "~/app/types/enums/reducer-name.enum";
import { EPathRouteScreen } from "~/app/types/enums/route.enum";
import { firebaseAuth } from "~/app/utils/firebase";
// import { Provider } from "react-redux";

const InitialLayout = () => {
  const user = useAppSelector(({ user }) => user);
  // const {user} = useSelector((state) => state[ReducerNameEnum.USER]);
  // const [authUser, setUser] = useState<UserAuth | null>(null);
  // const router = useRouter();

  // useEffect(() => {
  //   onAuthStateChanged(firebaseAuth, (user) => {
  //     console.log('user', user);
  //     setUser(user);
  //   });
  // }, []);

  console.log('user', user);
  useEffect(() => {
    router.replace(EPathRouteScreen.START);

    // setTimeout(() => {
    //   router.replace(!!user ? EPathRouteScreen.HOME : EPathRouteScreen.LOGIN);
    // }, 3000)
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
        <Provider store={store}>
          <Theme name="light">
            <InitialLayout />
          </Theme>
        </Provider>
      </GestureHandlerRootView>
    </TamaguiProvider>
  );
}
