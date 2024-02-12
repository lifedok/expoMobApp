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
          headerShown: true,
          headerLeft: () => <DrawerToggleButton />,
        }}
      />

      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: 'rgba(255,224,71,0.31)',
          },
          headerTintColor: '#000',
          headerBackTitle: 'Back',
        }}>
        <Stack.Screen
          name="movies"
          options={{
            headerTitle: 'Movies',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="[id]"
          options={{
            headerTitle: 'List item',
          }}
        />
      </Stack>
    </>
  );
}
