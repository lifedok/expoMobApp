import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';

import CustomDrawer from '~/app/components/custom-drawer/custom-drawer';
import colors from '~/app/consts/colors';

const DrawerLayout = () => {
  return (
    <Drawer
      initialRouteName="(tabs)"
      drawerContent={CustomDrawer}
      screenOptions={{
        drawerHideStatusBarOnOpen: true,
        drawerActiveBackgroundColor: colors.driverActiveBgColor,
        drawerActiveTintColor: colors.driverActiveTextColor,
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
