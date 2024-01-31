import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';

const DrawerLayout = () => (
  <Drawer>
    <Drawer.Screen
      name="(tabs)"
      options={{
        headerTitle: 'Home',
        drawerLabel: 'Home',
        headerShown: false,
        drawerIcon: ({ size, color }) => <Ionicons name="home-outline" size={size} color={color} />,
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
    <Drawer.Screen
      name="news"
      options={{
        headerTitle: 'Newsfeed',
        drawerLabel: 'News',
        drawerIcon: ({ size, color }) => (
          <Ionicons name="newspaper-outline" size={size} color={color} />
        ),
      }}
    />
  </Drawer>
);

export default DrawerLayout;
