import { DrawerToggleButton } from '@react-navigation/drawer';
import { Stack } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React from 'react';

export default function Page(): React.JSX.Element {
  return (
    <>
      <Drawer.Screen
        options={{
          headerTitle: 'Movies',
          headerShown: false,
        }}
      />

      <Stack
        screenOptions={{
          headerTintColor: '#000',
          headerBackTitle: 'Back',
        }}>
        <Stack.Screen
          name="movies"
          options={{
            headerTitle: 'Movies',
            headerLeft: () => <DrawerToggleButton />,
          }}
        />
        <Stack.Screen
          name="[id]"
          options={{
            title: '',
            headerShown: true,
          }}
        />
      </Stack>
    </>
  );
}
