import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { DrawerContentComponentProps } from '@react-navigation/drawer/src/types';
import { colorTokens } from '@tamagui/themes';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar, ListItem, styled, YStack, Text, Paragraph } from 'tamagui';

import { firebaseAuth } from '~/app/utils/firebase';
import { useGetUserSelector } from "~/app/store/selectors";

export default function CustomDrawer(props: DrawerContentComponentProps): React.ReactNode {
  const { userAuth } = useGetUserSelector();
  const { bottom } = useSafeAreaInsets();
  const paddingTop: number = 6;

  const handleSignOut = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        alert(`You have successfully logged out!`);
      })
      .catch((error) => alert(error.message));
  };

  const email = userAuth?.email ? userAuth.email : firebaseAuth.currentUser?.email;
  const username = userAuth?.username ? userAuth.username : null;

  console.log('userAuth', userAuth)
  return (
    <YStack f={1}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={{ backgroundColor: colorTokens.light.green.green2, flex: 1 }}>
        <ListItem
          {...!!username && {title: <UserName>{username}</UserName>}}
          subTitle={<Paragraph>{email ? email : 'Unidentified cat'}</Paragraph>}
          borderRadius={6}
          paddingHorizontal={12}
          paddingBottom={24}
          backgroundColor={colorTokens.light.green.green2}
          icon={() => (
            <Avatar circular size="$5">
              <Avatar.Image srcSet="http://placekitten.com/200/300" />
              <Avatar.Fallback bc={colorTokens.light.green.green2} />
            </Avatar>
          )}
        />
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <Footer pb={paddingTop + bottom} pt={paddingTop}>
        <DrawerItem
          label="Sign Out"
          icon={() => (
            <Ionicons name="log-out-outline" size={24} color={colorTokens.light.green.green9} />
          )}
          onPress={handleSignOut}
        />
      </Footer>
    </YStack>
  );
}

const Footer = styled(YStack, {
  borderTopColor: colorTokens.light.green.green5,
  borderTopWidth: 1,
  paddingHorizontal: 6,
});

const UserName = styled(Text, {
  fontWeight: '500',
  fontSize: 18,
  paddingTop: 10,
  color: colorTokens.light.green.green11,
});
