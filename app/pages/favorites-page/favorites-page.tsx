import { Ionicons } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Link } from 'expo-router';
import React from 'react';
import { YStack, Text, styled, ScrollView, ListItem, Button, Image } from 'tamagui';

import { useAppDispatch } from '~/app/hooks';
import { FavoriteItemInfo } from '~/app/pages/favorites-page/favorite-item-info';
import { removeFromFavorite } from '~/app/store/reducer/data/data-slice';
import { useGetDataSelector } from '~/app/store/selectors';
import { ERoutePaths } from '~/app/types/enums/route.enum';
import { ResultItem } from '~/app/types/interfaces/apiresults.interface';
import { getImagePath } from '~/app/utils/helpers';

export default function FavoritesPage(): React.JSX.Element {
  const { favorites } = useGetDataSelector();
  const dispatch = useAppDispatch();
  const bottomTabBarHeight: number = useBottomTabBarHeight();

  const onRemoveFavorite = (movieItem: ResultItem): void => {
    dispatch(removeFromFavorite({ item: movieItem }));
  };

  const paddingTop: number = 12;
  return (
    <ScrollView
      showsVerticalScrollIndicator
      width="100%"
      backgroundColor="$backgroundColor"
      borderRadius="$4"
      contentContainerStyle={{
        paddingTop,
        paddingHorizontal: 6,
        paddingBottom: bottomTabBarHeight + paddingTop,
      }}>
      <FavoritesStyles>
        {favorites.length ? (
          favorites.map((item: ResultItem, index: number) => {
            return (
              <Link key={`favorite_item${index}`} href={`${ERoutePaths.HOME}/${item.id}`} asChild>
                <ListItem
                  title={<FavoriteItemInfo item={item} />}
                  borderRadius={6}
                  padding={0}
                  paddingRight={12}
                  icon={() => {
                    return (
                      <Image
                        alt={item.title || item.name}
                        style={{ width: 60, height: 60 }}
                        source={getImagePath({
                          path: item.poster_path,
                          image: 'poster',
                          width: 500,
                        })}
                      />
                    );
                  }}
                  iconAfter={() => (
                    <Button
                      alignSelf="center"
                      onPress={() => onRemoveFavorite(item)}
                      style={{ width: 42, height: 42 }}
                      padding={0}
                      scaleIcon={1.2}
                      icon={() => <Ionicons name="trash" size={24} color="red" />}
                    />
                  )}
                />
              </Link>
            );
          })
        ) : (
          <YStack width="100%" ai="center" gap="12px">
            <EmptyText>It's still empty here.</EmptyText>
            <EmptyText>Add the movie to your favorites so that it appears here.</EmptyText>
          </YStack>
        )}
      </FavoritesStyles>
    </ScrollView>
  );
}

const FavoritesStyles = styled(YStack, {
  flex: 1,
  flexWrap: 'wrap',
  gap: '8px',
  alignItems: 'center',
  justifyContent: 'center',
  bg: 'rgba(0,255,255,0.02)',
});

const EmptyText = styled(Text, {
  fontSize: 18,
  fontWeight: '400',
  maxWidth: '80%',
  minHeight: 20,
  textAlign: 'center',
});
