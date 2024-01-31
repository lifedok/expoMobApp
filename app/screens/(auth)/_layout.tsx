import { Stack } from 'expo-router';
import React from 'react';

const PublicLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="login"
        options={{
          headerTitle: 'Clerk Auth App',
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          headerTitle: 'Create Account',
        }}
      />
      <Stack.Screen
        name="forgot"
        options={{
          headerTitle: 'Reset Password',
        }}
      />
    </Stack>
  );
};

export default PublicLayout;
