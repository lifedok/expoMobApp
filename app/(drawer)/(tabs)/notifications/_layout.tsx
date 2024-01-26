import { Ionicons } from '@expo/vector-icons';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { useRouter } from "expo-router";
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { Pressable } from 'react-native';

import Notifications from '~/app/(drawer)/(tabs)/notifications/notifications';

export const LogoutButton = () => {
  const router = useRouter();
  // const { signOut } = useAuth();
  //
  // const doLogout = () => {
  //   signOut();
  // };
  // onPress={doLogout}
  // href={{ pathname: '/login' }}
  return (
    <Pressable onPress={() => router.replace('/(auth)/login')} style={{ marginRight: 10 }}>
      <Ionicons name="log-out-outline" size={24} color="blue" />
    </Pressable>
  );
};

export default function Page() {
  return (
    <>
      <Drawer.Screen
        options={{
          headerTitle: 'Notifications',
          headerShown: true,
          headerLeft: () => <DrawerToggleButton />,
          headerRight: () => <LogoutButton />,
        }}
      />

      <Notifications />
    </>
  );
}
