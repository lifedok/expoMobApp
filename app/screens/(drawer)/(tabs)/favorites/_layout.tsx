import { DrawerToggleButton } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import React from 'react';

import FavoritesPage from '~/app/pages/favorites-page/favorites-page';

export default function Page() {
  return (
    <>
      <Drawer.Screen
        options={{
          headerTitle: 'Favorites',
          headerShown: true,
          headerLeft: () => <DrawerToggleButton />,
          headerLeftContainerStyle: {
            paddingLeft: 16,
          },
        }}
      />

      <FavoritesPage />
    </>
  );
}
