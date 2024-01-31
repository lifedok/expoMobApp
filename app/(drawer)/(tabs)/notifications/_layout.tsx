import { Ionicons } from '@expo/vector-icons';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { Pressable } from 'react-native';

import Notifications from '~/app/(drawer)/(tabs)/notifications/notifications';
import { firebaseAuth } from '~/utils/firebase';

export const LogoutButton = () => {
  const handleSignOut = () => {
    firebaseAuth
      .signOut()
      .then(() => {})
      .catch((error) => alert(error.message));
  };

  return (
    <Pressable onPress={handleSignOut} style={{ marginRight: 10 }}>
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
