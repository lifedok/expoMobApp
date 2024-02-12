import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import { useEffect } from 'react';

import { useAppDispatch } from '~/app/hooks';
import { fetchTrendingMovies } from '~/app/store/reducer/data/data-actions.thunk';

const DrawerLayout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTrendingMovies({ page: 1 }));
  }, []);

  return (
    <Drawer>
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
