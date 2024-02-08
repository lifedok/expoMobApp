import { DrawerToggleButton } from '@react-navigation/drawer';
import { Stack } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React from 'react';

export default function Page() {
  return (
    <>
      <Drawer.Screen
        options={{
          headerTitle: 'Home',
          headerShown: true,
          headerLeft: () => <DrawerToggleButton />,
        }}
      />

      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6c47ff',
          },
          headerTintColor: '#fff',
          headerBackTitle: 'Back',
        }}>
        <Stack.Screen
          name="list"
          options={{
            headerTitle: 'List',
          }}
        />
        <Stack.Screen
          name="[id]"
          options={{
            headerTitle: 'List item',
          }}
        />
        <Stack.Screen
          name="details"
          options={{
            headerTitle: 'details',
          }}
        />
      </Stack>
    </>
  );
}
