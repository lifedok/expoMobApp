import { YStack, Text, styled, ScrollView, ListItem } from "tamagui";

import { useAppDispatch } from "~/app/hooks";
import { removeFromFavorite } from "~/app/store/reducer/data/data-slice";
import { useGetDataSelector } from "~/app/store/selectors";
import { Link } from "expo-router";
import Animated from "react-native-reanimated";
import { EPathRouteScreen } from "~/app/types/enums/route.enum";

export default function Favorites() {
  const { favorites } = useGetDataSelector();
  const dispatch = useAppDispatch();

  const onRemoveFavorite = (name: string): void => {
    dispatch(removeFromFavorite({ item: { id: name } }));
  };

  console.log("favorites", favorites);
  return (
    <ScrollView
      showsVerticalScrollIndicator
      width="100%"
      backgroundColor="$backgroundColor"
      borderRadius="$4"
      contentContainerStyle={{
        paddingVertical: 12,
        paddingHorizontal: 6
      }}>
      <FavoritesStyles>
        {favorites.length ? (
          favorites.map((item, index) => {
            return (
              <Link key={`favorite_item${index}`} href={`${EPathRouteScreen.HOME}/${item.id}` as never} asChild>
                <ListItem
                  title={item.name}
                  size={'$3'}
                  icon={() => {
                    return (
                      <Animated.Image
                        alt={item.title}
                        style={{ width: 70, height: 70 }}
                        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                        sharedTransitionTag={`${item?.media_type === 'movie' ? 'movie' : 'tv'}-${item.id}`}
                      />
                    )
                  }}/>
              </Link>
            )
          })
        ) : (
          <YStack>
            <Text>It's still empty here. Add the movie to your favorites so that it appears here.</Text>
          </YStack>
        )}
      </FavoritesStyles>
    </ScrollView>
  );
}

const FavoritesStyles = styled(YStack, {
  flexWrap: "wrap",
  gap: "8px",
  alignItems: "center",
  justifyContent: "center"
});
