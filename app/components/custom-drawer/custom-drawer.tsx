import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { DrawerContentComponentProps } from '@react-navigation/drawer/src/types';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar, ListItem, styled, YStack, Text, Paragraph } from 'tamagui';

import colors from '~/app/consts/colors';
import { useAppDispatch } from '~/app/hooks';
import { getStorageItem } from '~/app/services/storage';
import { addStatusInfo } from '~/app/store/reducer/user/user-slice';
import { ETextStatus } from '~/app/types/interfaces/global-text-info';
import { firebaseAuth } from '~/app/utils/firebase';

export default function CustomDrawer(props: DrawerContentComponentProps): React.ReactNode {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState<string>('');

  const { bottom } = useSafeAreaInsets();
  const paddingTop: number = 6;

  const email = firebaseAuth.currentUser?.email;

  const handleSignOut = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        dispatch(
          addStatusInfo({ text: 'You have successfully logged out!', status: ETextStatus.SUCCESS })
        );
      })
      .catch((error) => {
        dispatch(addStatusInfo({ text: error.message, status: ETextStatus.ERROR }));
      });
  };

  if (email) {
    getStorageItem({ key: email }).then((value) => {
      if (value) setUsername(value);
    });
  }

  return (
    <YStack f={1}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={{ backgroundColor: colors.driverBgColor, flex: 1 }}>
        <ListItem
          {...(!!username && { title: <UserName>{username}</UserName> })}
          subTitle={<Paragraph>{email ? email : 'Unidentified cat'}</Paragraph>}
          borderRadius={6}
          paddingHorizontal={12}
          paddingBottom={24}
          backgroundColor={colors.driverBgColor}
          icon={() => (
            <Avatar circular size="$5">
              <Avatar.Image srcSet="http://placekitten.com/200/300" />
              <Avatar.Fallback bc={colors.driverBgColor} />
            </Avatar>
          )}
        />
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <Footer pb={paddingTop + bottom} pt={paddingTop}>
        <DrawerItem
          label="Sign Out"
          icon={() => <Ionicons name="log-out-outline" size={24} color={colors.driverIconColor} />}
          onPress={handleSignOut}
        />
      </Footer>
    </YStack>
  );
}

const Footer = styled(YStack, {
  borderTopColor: colors.driverBorderColor,
  borderTopWidth: 1,
  paddingHorizontal: 6,
});

const UserName = styled(Text, {
  fontWeight: '500',
  fontSize: 18,
  paddingTop: 10,
  color: colors.textColorPrimary,
});
