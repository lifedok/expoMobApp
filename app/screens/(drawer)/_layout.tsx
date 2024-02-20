import { Ionicons } from '@expo/vector-icons';
import { colorTokens } from '@tamagui/themes';
import { Drawer } from 'expo-router/drawer';

import CustomDrawer from '~/app/components/custom-drawer/custom-drawer';

const DrawerLayout = () => {
  return (
    <Drawer
      initialRouteName="(tabs)"
      drawerContent={CustomDrawer}
      screenOptions={{
        drawerHideStatusBarOnOpen: true,
        drawerActiveBackgroundColor: colorTokens.dark.blue.blue7,
        drawerActiveTintColor: '#fff',
        drawerLabelStyle: { marginLeft: -20 },
      }}>
      <Drawer.Screen
        name="(tabs)"
        options={{
          headerTitle: 'Home',
          drawerLabel: 'Home',
          headerShown: false,
          drawerIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          headerTitle: 'Profile',
          drawerLabel: 'Profile',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="newspaper-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
