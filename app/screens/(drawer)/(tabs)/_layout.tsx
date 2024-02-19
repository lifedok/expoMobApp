import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}): React.JSX.Element {
  return <FontAwesome size={24} style={styles.tabBarIcon} {...props} />;
}

export default function TabsLayout(): React.ReactNode {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        headerShown: true,
        tabBarStyle: {
          position: 'absolute',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 60,
        },
        tabBarBackground: (): React.ReactNode => (
          <BlurView
            intensity={60}
            style={{
              ...StyleSheet.absoluteFillObject,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              overflow: 'hidden',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
            }}
          />
        ),
      }}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: '',
          title: 'Home tab',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          tabBarLabel: '',
          title: 'Favorites tab',
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 15,
  },
  tabBarIcon: {
    marginBottom: -28,
  },
});
