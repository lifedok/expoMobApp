import { Ionicons } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Link } from 'expo-router';
import React from 'react';
import Animated from 'react-native-reanimated';
import { YStack, Text, styled, ScrollView, ListItem, Button } from 'tamagui';

import { useAppDispatch } from '~/app/hooks';
import { FavoriteItemInfo } from '~/app/pages/favorites-page/favorite-item-info';
import { removeFromFavorite } from '~/app/store/reducer/data/data-slice';
import { useGetDataSelector } from '~/app/store/selectors';
import { EPathRouteScreen } from '~/app/types/enums/route.enum';
import { ResultItem } from '~/app/types/interfaces/apiresults.interface';

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
              <Link
                key={`favorite_item${index}`}
                href={`${EPathRouteScreen.HOME}/${item.id}` as never}
                asChild>
                <ListItem
                  title={<FavoriteItemInfo item={item} />}
                  borderRadius={6}
                  padding={0}
                  paddingRight={12}
                  icon={() => {
                    return (
                      <Animated.Image
                        alt={item.title || item.name}
                        style={{ width: 60, height: 60 }}
                        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                        sharedTransitionTag={`${item.media_type === 'movie' ? 'movie' : 'tv'}-${item.id}`}
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
          <YStack>
            <Text>
              It's still empty here. Add the movie to your favorites so that it appears here.
            </Text>
          </YStack>
        )}
      </FavoritesStyles>
    </ScrollView>
  );
}

const FavoritesStyles = styled(YStack, {
  flexWrap: 'wrap',
  gap: '8px',
  alignItems: 'center',
  justifyContent: 'center',
});
