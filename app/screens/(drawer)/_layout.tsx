import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Drawer } from 'expo-router/drawer';
import { useEffect } from 'react';

import { useAppDispatch } from '~/app/hooks';
import { getTrending } from '~/app/services/api';
import { loadTrendingMovie } from '~/app/store/actions';

const DrawerLayout = () => {
  const dispatch = useAppDispatch();

  const trendingQuery = useQuery({
    queryKey: ['trending'],
    queryFn: getTrending,
  });

  useEffect(() => {
    if (trendingQuery.data) {
      dispatch(loadTrendingMovie(trendingQuery.data));
    }
  });
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
};

export default DrawerLayout;
