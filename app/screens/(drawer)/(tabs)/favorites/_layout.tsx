import { Ionicons } from '@expo/vector-icons';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { Pressable } from 'react-native';

import FavoritesPage from '~/app/pages/favorites-page/favorites-page';
import { firebaseAuth } from '~/app/utils/firebase';

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
          headerTitle: 'Favorites',
          headerShown: true,
          headerLeft: () => <DrawerToggleButton />,
          headerRight: () => <LogoutButton />,
        }}
      />

      <FavoritesPage />
    </>
  );
}
